module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
        	options: {
      stripBanners: true,
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
    },
		    dist: {
		        src: [
		        	'js/jquery.min.js',
		        	'js/mustache.js',
		            'js/*.js'
		        ],
		        dest: 'build/js/production.js',
		    }
		},
		uglify: {
			options: {
      mangle: false
    },
		    build: {
		        src: 'build/js/production.js',
		        dest: 'build/js/production.min.js'
		    }
		},
		less: {
		  development: {
		    
		    files: {
		      "css/zless.css": "css/*.less"
		    }
		  },
		  production: {
		   
		    files: {
		      "css/zless.css": "css/*.less"
		    }
		  }
		},
		cssmin: {
		  add_banner: {
		    options: {
		      banner: '/* My minified css file */'
		    },
		    files: {
		      'build/css/production.min.css': ['css/*.css']
		    }
		  }
		},
		htmlmin: {                                     // Task
		    dist: {                                      // Target
		      options: {                                 // Target options
		        removeComments: true,
		        collapseWhitespace: true,
		        removeCommentsFromCDATA: true
		      },
		      files: {                                   // Dictionary of files
		        'build/index.html': 'index.html',    // 'destination': 'source'
		        'build/js/blog.mustache.html' : 'js/blog.mustache.html',
		        'build/js/resume.mustache.html' : 'js/resume.mustache.html',
		        'build/js/resume.json' : 'js/resume.json'
		      }
		    }
		  },
		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'img/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: 'build/img'
		        }]
		    }
		},
		watch: {
		    scripts: {
		        files: ['js/*.js'],
		        tasks: ['concat', 'uglify', 'cssmin', 'htmlmin'],
		        options: {
		            livereload: true,
		            spawn: false,
		        },
		    } 
		}
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    // npm install grunt-contrib-concat --save-dev; npm install grunt-contrib-cssmin --save-dev
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin', 'htmlmin', 'imagemin']);

};