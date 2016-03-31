/*
 * grunt-rainforestqa
 * https://github.com/mrjpierce/grunt-rainforestqa
 *
 * Copyright (c) 2016 James Pierce
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('rainforestqa', 'A grunt plugin for running rainforest QA tasks', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      token: '',
      testIds: [],
      tags: []
      apiBaseUrl: 'https://app.rainforestqa.com'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
