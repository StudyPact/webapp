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
            includeSource: {
                files: ['public/index.tpl.html'],
                tasks: ['includeSource:dev']
            }
        },
        less: {
            studypact: {
                files: {
                    "public/assets/build/css/studypact.css": "public/assets/css/studypact.less"
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
                    'public/index.html': 'public/index.tpl.html'
                }
            }
        }
    });
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', [ 'less:studypact', 'includeSource:dev']);
    grunt.registerTask('watch' ['watch'])

};
