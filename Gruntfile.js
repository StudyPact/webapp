var path = require('path');

module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-include-source');

    grunt.initConfig({

        watch: {
            less: {
                files: ['public/assets/css/*.less'],
                tasks: ['less:studypact']
            },
            includeSourceTemplate: {
                files: ['public/index.tpl.html'],
                tasks: ['includeSource:dev']
            },
            includeSourceJS: {
                files: ['public/app/**/*.js'],
                tasks: ['includeSource:dev'],
                options: {
                    event: ['added', 'deleted']
                }
            }
        },
        less: {
            studypact: {
                files: {
                    "public/build/css/studypact.css": "public/assets/css/studypact.less"
                }
            }
        },
        includeSource: {
            options: {
                basePath: 'public',
                baseUrl: '/',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
                    }
                }
            },
            dev: {
                files: {
                    'public/index.html': 'public/assets/index.tpl.html'
                }
            }
        }
    });
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', [ 'less:studypact', 'includeSource:dev']);
    grunt.registerTask('watch' ['watch'])
    grunt.registerTask('heroku', ['build']);
};
