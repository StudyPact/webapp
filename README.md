The mighty StudyPact WebApp Welcomes you
========================================

Requirements
------------

* nodejs for hosting the files
* gruntjs for compiling
* heroku toolbelt for foreman https://toolbelt.heroku.com/

Getting started
---------------
```shell
$ git clone git@github.com:StudyPact/webapp.git studypact-webapp
$ cd studypact-webapp
$ npm install
$ grunt build-local
$ foreman start
```

Continuous Integration
----------------------
Test Status: [ ![Codeship Status for StudyPact/webapp](https://codeship.com/projects/056550b0-4ea7-0132-13bf-323959f31113/status)](https://codeship.com/projects/47769)
* development branch will end up here https://studypact-webapp-test.herokuapp.com
* master branch will end up in a secret production test environment
