var path = require('path');

module.exports = function(grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-concurrent");

    grunt.initConfig({

        concurrent: {
            server: ['watch:less'],
            options: {
                logConcurrentOutput: true
            }
        },

        watch: {
            less: {
                files: ['public/assets/less/*.less'],
                tasks: ['less:studypact'],
                options: {
                    livereload: true,
                    forever: false
                }
            }
        },

        less: {
            studypact: {
                files: {
                    "public/assets/css/studypact.css": "public/assets/less/studypact.less"
                }
            }
        },

        express: {
            options: {
                port: 3000,
                hostname: '*'
            },
            livereload: {
                /*
                 options: {
                 server: 'main.js',
                 bases: ['public', 'views']
                 }
                 */
            }
        }
    });
    grunt.registerTask('default', ['run']);
    grunt.registerTask('run', ['less:studypact']);

};
