var path = require('path');

module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-ng-constant');

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
        },
        ngconstant: {
            // Options for all targets
            options: {
                wrap: false,
                deps: false,
                name: 'studypact'
            },
            // Environment targets
            config: {
                options: {
                    dest: 'public/app/config.js'
                },
                constants: {
                    Config: {
                        host: process.env.HOST,
                        api_version: process.env.API_VERSION,
                        client_id: process.env.CLIENT_ID,
                        client_secret: process.env.CLIENT_SECRET
                    }
                }
            }
        }
    });
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', [ 'less:studypact', 'ngconstant:config', 'includeSource:dev']);
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('heroku:development', ['build']);
};
