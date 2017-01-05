/* globals require, module */
/* jslint node: true */

'use strict';

var _ = require('lodash'),
	fs = require('fs'),
	p = require('path'),
	pad = require('pad');

var fields = {
	'themename': 'Theme Name',
	'homepage': 'Theme URI',
	'description': 'Description',
	'version': 'Version',
	'author': 'Author',
	'authoruri': 'Author URI',
	'keywords': 'Tags',
	'textdomain': 'Text Domain',
	'template': 'Template',
	'license': 'License',
	'licenseuri': 'License URI',
};

module.exports = function (path) {
	return new WPFileHeader(path);
};

/**
 * WPFileHeader constructor.
 * @param       {string} path package.json filepath.
 * @constructor
 */
var WPFileHeader = function (path) {
	if (typeof path === 'undefined') {
		path = './package.json';
	}
	this.manifest_path = p.normalize(path);
};

/**
 * Modifes style.css.
 * This will also create one if not exists, but will not create directories.
 *
 * @param   {string=} style style.css filepath. Default './style.css'.
 * @param   {Function=} cb Callback function to be called.
 * @return  {void}
 */
WPFileHeader.prototype.patch = function (style, callback) {
	var commentsPattern = /(?:\/\*(?:[\s\S]*?)\*\/\s?)|(?:([\s;])+\/\/(?:.*)$)/;

	if (typeof style === 'undefined' || typeof style === 'function') {
		callback = style;
		style = './style.css';
	}

	style = p.normalize(style);

	fs.readFile(this.manifest_path, 'utf8', function (err, manifest) {
		if (err) {
			if (callback) {
				callback(err);
			}
			else {
				throw err;
			}
		}
		else {
			manifest = JSON.parse(manifest);
			fs.readFile(style, 'utf8', function (err, data) {
				if (err && err.code !== 'ENOENT') {
					if (callback) {
						callback(err);
					}
					else {
						throw err;
					}
				}
				else {
					if (typeof data === 'undefined') {
						data = '';
					}
					if (commentsPattern.test(data)) {
						data = data.replace(commentsPattern, '');
					}
					data = createContent(manifest) + data;
					fs.writeFile(style, data, function (err) {
						if (err) {
							if (callback) {
								callback(err);
							}
							else {
								throw err;
							}
						}
						else {
							if (callback) {
								callback(null);
							}
						}
					});
				}
			});
		}
	});
};

/**
 * Creates style.css header content.
 *
 * @param   {Object} manifest
 * @return  {string}
 */
var createContent = function (manifest) {
	var out = "/*\n";
	_.forEach(fields, function (n, key) {
		if (typeof manifest[key] != 'undefined') {
			out += pad(n + ':', 20) + manifest[key] + "\n";
		}
	});
	out += "*/\n";

	return out;
};
