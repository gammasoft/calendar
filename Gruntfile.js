'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            'dist/gammacalendar-v<%= pkg.version %>.min.js': 'gammacalendar.js'
        },

        cssmin: {
            minify: {
                files: {
                    'dist/gammacalendar-v<%= pkg.version %>.min.css': ['gammacalendar.css']
                }
            }
        },

        jshint: {
            all : ['gammacalendar.js'],
            options: {
                node: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                bitwise: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                plusplus: false,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                maxparams: 4,
                maxdepth: 4,
                globals: {
                    $: false,
                    jQuery: false,
                    document: false
                }
            }
        },

        clean: ["dist/*"]
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', [
        'jshint'
    ]);

    grunt.registerTask('release', [
        'clean',
        'jshint',
        'uglify',
        'cssmin'
    ]);
};