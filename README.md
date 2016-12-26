# wp-file-header

[Node.js](https://nodejs.org) plugin that adds ['File Header'](https://codex.wordpress.org/File_Header) to [Wordpress Theme's style.css file](https://codex.wordpress.org/Theme_Development#Theme_Stylesheet) based on [package.json](https://docs.npmjs.com/files/package.json) data

For now works only with style.css file (supports only WP Themes, not plugins)

## Installation

```bash
$ npm i wp-file-header --save-dev
```

## Description
Creates this: **style.css**

```css
/*
Theme Name:     Twenty Thirteen
Theme URI:      http://wordpress.org/themes/twentythirteen
Author:         the WordPress team
Author URI:     http://wordpress.org/
Description:    The 2013 theme for WordPress takes us back to the blog, featuring a full range of post formats, each displayed beautifully in their own unique way. Design details abound, starting with a vibrant color scheme and matching header images, beautiful typography and icons, and a flexible layout that looks great on any device, big or small.
Version:        1.0.0
License:        GNU General Public License v2 or later
License URI:    http://www.gnu.org/licenses/gpl-2.0.html
Tags:           black, brown, orange, tan, white, yellow, light, one-column, two-columns, right-sidebar, flexible-width, custom-header, custom-menu, editor-style, featured-images, microformats, post-formats, rtl-language-support, sticky-post, translation-ready
Text Domain:    twentythirteen
Template:       twentytwelve
*/

```

From this: **package.json**

```json
{
	"name": "twenty-thirteen",
	"version": "1.0.0",
	"author": "the WordPress team",
	"authoruri": "http://wordpress.org/",
	"homepage": "http://wordpress.org/themes/twentythirteen",
	"description": "The 2013 theme for WordPress takes us back to the blog, featuring a full range of post formats, each displayed beautifully in their own unique way. Design details abound, starting with a vibrant color scheme and matching header images, beautiful typography and icons, and a flexible layout that looks great on any device, big or small.",
	"keywords": [
		"black",
		"brown",
		"orange",
		"tan",
		"white",
		"yellow",
		"light",
		"one-column",
		"two-columns",
		"right-sidebar",
		"flexible-width",
		"custom-header",
		"custom-menu",
		"editor-style",
		"featured-images",
		"microformats",
		"post-formats",
		"rtl-language-support",
		"sticky-post",
		"translation-ready"
	],
	"themename": "Twenty Thirteen",
	"textdomain": "twentythirteen",
	"license": "GNU General Public License v2 or later",
	"licenseuri": "http://www.gnu.org/licenses/gpl-2.0.html",
	"template": "twentytwelve"
}

```

## Usage

#### Plain

```js
var wp = require('wp-file-header')('./package.json');
wp.patch('./style.css', function(err){
	// done
});
```

or just

```js
var wp = require('wp-file-header')();
wp.patch();
```

#### With Gulp:

```js
var gulp = require('gulp'),
	wp   = require('wp-file-header')('./package.json');

gulp.task('wp', function () {
	wp.patch('./style.css', function(err){
		// done
	});
});
```

#### With Grunt:

```js
module.exports = function(grunt) {
	var wp = require('wp-file-header')('./package.json');
	grunt.registerTask('wp', function() {
		var done = this.async();
		wp.patch('./style.css', function(err){
			done();
		});
	});
};
```
