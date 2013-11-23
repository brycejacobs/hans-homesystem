/*
 * Gruntfile.js
 */

'use strict';

var path = require('path');
var project = require('./project');

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    project: project,
    bump: {
      options: {
        commitFiles: ['-a'],
        createTag: false,
        pushTo: 'heroku'
      }
    },
    cacheBust: {
      dev: {
        files: {
          src: [
            '<%= project.path.temp %>/index.html'
          ]
        }
      },
      dist: {
        files: {
          src: [
            '<%= project.path.dist %>/index.html'
          ]
        }
      }
    },
    clean: {  // grunt-contrib-clean
      dev: [
        '<%= project.path.temp %>'
      ],
      dist: [
        '<%= project.path.dist %>'
      ]
    },
    copy: {  // grunt-contrib-copy
      heroku: {
        src: '.gitignore-heroku',
        dest: '.gitignore'
      },
      github: {
        src: '.gitignore-github',
        dest: '.gitignore'
      },
      dev: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: '<%= project.path.bower %>',
            dest: '<%= project.path.dist %>/js/vendor',
            src: [
              'es5-shim/es5-shim.js',
              'json3/lib/json3.js',
              'modernizr/modernizr.js'
            ]
          },
          {
            expand: true,
            cwd: '<%= project.path.client %>',
            dest: '<%= project.path.dist %>',
            src: [
              'index.html'
            ]
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: '<%= project.path.bower %>',
            dest: '<%= project.path.dist %>/js/vendor',
            src: [
              'es5-shim/es5-shim.js',
              'json3/lib/json3.js',
              'modernizr/modernizr.js'
            ]
          },
          {
            expand: true,
            cwd: '<%= project.path.client %>',
            dest: '<%= project.path.dist %>',
            src: [
              'styles.css',
              '*.{ico,txt}'
            ]
          }
        ]
      }
    },
    cssmin: {  // grunt-contrib-cssmin
      dist: {
        files: {
          '<%= project.path.dist %>/css/main.css': [
            '<%= project.path.temp %>/css/**/*.css',
            '<%= project.path.dist %>/css/**/*.css'
          ]
        }
      }
    },
    express: {  // grunt-express
      server: {
        options: {
          bases: [],
          debug: true,
          port: '<%= process.env.PORT || project.server.port %>',
          server: path.resolve('<%= project.path.server %>')
        }
      }
    },
    htmlmin: {  // grunt-contrib-htmlmin
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.path.client %>',
          src: [
            '*.html'
          ],
          dest: '<%= project.path.dist %>'
        }]
      }
    },
    imagemin: {  // grunt-contrib-imagemin
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.path.client %>/img',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= project.path.dist %>/img'
        }]
      }
    },
    jshint: {  // grunt-contrib-jshint
      options: {
        jshintrc: '.jshintrc-server'
      },
      client: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [
            '<%= project.path.client %>/**/*.js',
            '!<%= project.path.client %>/lib/**/*.js',
            '!<%= project.path.client %>/templates.js'
          ]
        }
      },
      server: {
        files: {
          src: '<%= project.path.server %>/**/*.js'
        }
      },
      grunt: [
        'Gruntfile.js'
      ]
    },
    open: {  // grunt-open
      dev: {
        url: 'http://localhost:<%= process.env.PORT || project.server.port %>'
      }
    },
    uglify: {
      dist: {
        options: {
          mangle: false
        },
        files: {
          '<%= project.path.dist %>/js/app.js':
          [
            '<%= project.path.client %>/**/*.js',
            '!<%= project.path.client %>/lib/**/*.js',
            '<%= project.path.client %>/lib/angular-ui-utils/modules/route/route.js'
          ]
        }
      }
    },
    usemin: {  // grunt-usemin
      options: {
        dirs: ['<%= project.path.dist %>']
      },
      html: ['<%= project.path.dist %>/**/*.html'],
      css: ['<%= project.path.dist %>/**/*.css']
    },
    useminPrepare: {  // grunt-usemin
      options: {
        dest: '<%= project.path.dist %>'
      },
      html: '<%= project.path.client %>/index.html'
    },
    html2js: {
      /**
       * These are the templates from `src/app`.
       */
      app: {
        options: {
          base: '<%= project.path.client %>'
        },
        src: [ '<%= project.path.client %>/**/*.tpl.html' ],
        dest: '<%= project.path.client %>/templates.js'
      }
    },
    sass: {
      dev: {
        files: {
          '<%= project.path.client %>/css/styles.css':
          [
            '<%= project.path.client %>/app.scss'
          ]
        }
      }
    },
    concat: {

    },
    watch: {  // grunt-contrib-watch
      assets: {
        options: {
          livereload: true
        },
        files: [
          '<%= project.path.client %>/index.html',
          '<%= project.path.client %>/fonts/{,*/}*',
          '<%= project.path.client %>/img/{,*/}*.png',
          '<%= project.path.client %>/**/*.js',
          '<%= project.path.server %>/views/{,*/}*.hbs'
        ]
      },
      tpls: {
        files: [
          '<%= project.path.client %>/**/{,*/}*.tpl.html'
        ],
        tasks: [ 'html2js' ]
      },
      jsHintClient: {
        files: [
          '<%= project.path.client %>/**/{,*/}*.js',
          '!<%= project.path.client %>/templates.js'
        ],
        tasks: ['jshint:client']
      },
      jsHintServer: {
        files: ['<%= project.path.server %>/**/{,*/}*.js'],
        tasks: ['jshint:server']
      },
      css: {
        options: {
          livereload: true
        },
        files: ['<%= project.path.client %>/**/{,*/}*.css']
      },
      sass: {
        options: {
        },
        files: ['<%= project.path.client %>/**/{,*/}*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.registerTask('devBuild', [
    'clean:dev',
    'copy:dev',
    'cacheBust:dev'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'useminPrepare',
    'imagemin:dist',
    'htmlmin:dist',
    'cssmin:dist',
    'uglify:dist',
    'copy:dist',
    'usemin',
    'cacheBust:dist'
  ]);

  grunt.registerTask('deploy', [
    'copy:heroku',
    'build',
    'bump',
    'copy:github'
  ]);

  grunt.registerTask('checkin', [
    'copy:github',
    'clean:client'
  ]);

  grunt.registerTask('devServer', function () {
    process.env.LIVERELOAD = 35729;
    grunt.task.run([
      'express',
      'open'
    ]);
    if (process.env.NODE_ENV !== 'heroku' && process.env.NODE_ENV !== 'production') {
      grunt.task.run('watch');
    }
  });

  grunt.registerTask('develop', ['open', 'watch']);

  // Default
  grunt.registerTask('default', 'develop');
};
