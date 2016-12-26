/* globals require, module, describe, it */
/* jslint node: true */

'use strict';

var expect = require('chai').expect,
	wpfh = require('..')('./test/package.json'),
	path = require('path'),
	fs = require('fs'),
	tmp = path.join(__dirname, './fixtures/.working.css');

var testName = {
	withComments: 'Add "File Header" to no-empty file with some comments',
	withoutComments: 'Add "File Header" to no-empty file without comments',
	emptyFile: 'Add "File Header" to empty file',
	newFile: 'Create new file and add "File Header" to it',
	fileNotCreated: 'Return error if style.css could not be created'
};

require('mocha');

describe('wp-file-header:', function () {

	it(testName.withComments, function (done) {
		var wf = use('not-empty-with-some-comments.css');
		var fakeFileOldContents = fs.readFileSync(wf, 'utf8');
		var patch = wpfh.patch(wf, function (err) {
			expect(err).to.be.null; // jshint ignore:line
			var fakeFileNewContents = fs.readFileSync(wf, 'utf8');
			valid(fakeFileNewContents);
			expect(fakeFileNewContents).to.not.equal(fakeFileOldContents);
			fs.unlinkSync(wf);
			done();
		});
	});

	it(testName.withoutComments, function (done) {
		var wf = use('not-empty-without-comments.css');
		var fakeFileOldContents = fs.readFileSync(wf, 'utf8');
		var patch = wpfh.patch(wf, function (err) {
			expect(err).to.be.null; // jshint ignore:line
			var fakeFileNewContents = fs.readFileSync(wf, 'utf8');
			valid(fakeFileNewContents);
			expect(fakeFileNewContents).to.not.equal(fakeFileOldContents);
			fs.unlinkSync(wf);
			done();
		});
	});

	it(testName.emptyFile, function (done) {
		var wf = use('empty-without-comments.css');
		var fakeFileOldContents = fs.readFileSync(wf, 'utf8');
		var patch = wpfh.patch(wf, function (err) {
			expect(err).to.be.null; // jshint ignore:line
			var fakeFileNewContents = fs.readFileSync(wf, 'utf8');
			valid(fakeFileNewContents);
			expect(fakeFileNewContents).to.not.equal(fakeFileOldContents);
			fs.unlinkSync(wf);
			done();
		});
	});

	it(testName.newFile, function (done) {
		var wf = tmp;
		var patch = wpfh.patch(wf, function (err) {
			expect(err).to.be.null; // jshint ignore:line
			var fakeFileNewContents = fs.readFileSync(wf, 'utf8');
			valid(fakeFileNewContents);
			fs.unlinkSync(wf);
			done();
		});
	});

	it(testName.fileNotCreated, function (done) {
		var wf = 'some/other/folders/style.css';
		var patch = wpfh.patch(wf, function (err) {
			expect(err).to.not.be.null; // jshint ignore:line
			done();
		});
	});

});

var use = function (template) {
	template = path.join(__dirname, './fixtures/' + template);
	fs.createReadStream(template).pipe(fs.createWriteStream(tmp));
	return tmp;
};

var valid = function (c) {
	expect(c).to.not.be.undefined; // jshint ignore:line
	expect(c).to.not.be.null; // jshint ignore:line
	expect(c).to.not.be.empty; // jshint ignore:line
	expect(c).to.contain('Theme Name');
	expect(c).to.contain('Description');
	expect(c).to.contain('Version');
	expect(c).to.contain('Author');
};
