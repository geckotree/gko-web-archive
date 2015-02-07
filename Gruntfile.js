module.exports = function ( grunt ) {

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		/*
		 * WATCH
		 */
		watch: {
			css: {
				files: [
					'<%= pkg.assetsFolder %>/sass/**/**/*.scss'
				],
				tasks: [
					'sass:dist',
					'autoprefixer',
					'css_mqpacker',
					'stripmq',
					'pixrem',
					'cssmin'
				]
			},
			js: {
				files: [
					'<%= pkg.assetsFolder %>/js/**/*.js'
				],
				tasks: [
					'requirejs',
					'jshint',
					'concat',
					'uglify'
				]
			}
		},


		/*
		 * CSS
		 */
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: true
				},
				files: {
					'<%= pkg.assetsFolder %>/_build/css/style.css': '<%= pkg.assetsFolder %>/sass/style.scss',
					'<%= pkg.assetsFolder %>/_build/css/ie.css': '<%= pkg.assetsFolder %>/sass/ie.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: [ 'last 3 version' ]
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: '<%= pkg.assetsFolder %>/_build/css/style.css',
				dest: '<%= pkg.assetsFolder %>/_build/css'
			}
		},
		css_mqpacker: {
			options: {
				map: false,
			},
			main: {
				expand: true,
				cwd: '<%= pkg.assetsFolder %>/_build/css/',
				src: 'style.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/'
			}
		},
		stripmq: {
			options: {
				width: '62.5em',
				type: 'screen'
			},
			all: {
				files: {
					'<%= pkg.assetsFolder %>/_build/css/ie.css': [ '<%= pkg.assetsFolder %>/_build/css/ie.css' ]
				}
			}
		},
		pixrem: {
			options: {
				rootvalue: '62.5%',
				replace: true
			},
			dist: {
				src: '<%= pkg.assetsFolder %>/_build/css/ie.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/ie.css'
			}
		},
		cssmin: {
			main: {
				expand: true,
				cwd: '<%= pkg.assetsFolder %>/_build/css/',
				src: 'style.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/',
				ext: '.min.css'
			},
			ie: {
				expand: true,
				cwd: '<%= pkg.assetsFolder %>/_build/css/',
				src: 'ie.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/',
				ext: '.min.css'
			}
		},


		/*
		 * JS
		 */
		requirejs: {
			compile: {
				options: {
					mainConfigFile: '<%= pkg.assetsFolder %>/js/config.js',
					preserveLicenseComments: false,
					removeCombined: true,
					optimize: 'uglify2'
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: {
				files: {
					src: [
						'Gruntfile.js',
						'<%= pkg.assetsFolder %>/js/**/*.js'
					]
				}
			}
		},
		concat: {
			head: {
				src: [
					'<%= pkg.assetsFolder %>/_components/lazysizes/lazysizes.js',
					'<%= pkg.assetsFolder %>/_components/modernizr/modernizr.js'
				],
				dest: '<%= pkg.assetsFolder %>/_build/js/head.js'
			}
		},
		uglify: {
			head: {
				files: {
					'<%= pkg.assetsFolder %>/_build/js/head.js': '<%= pkg.assetsFolder %>/_build/js/head.js',
					'<%= pkg.assetsFolder %>/_build/js/require.js': '<%= pkg.assetsFolder %>/_components/requirejs/require.js'
				}
			}
		},


		/*
		 * IMAGES
		 */
		svg2png: {
			all: {
				files: [{
					cwd: '<%= pkg.assetsFolder %>/img/svg',
					src: [ '*.svg' ],
					dest: '<%= pkg.assetsFolder %>/_build/img/svg'
				}]
			}
		},
		svgmin: {
			options: {
				plugins: [
					{ removeViewBox: true },
					{ removeUselessStrokeAndFill: false },
					{ removeEmptyAttrs: false }
				]
			},
			all: {
				files: [{
					expand: true,
					cwd: '<%= pkg.assetsFolder %>/img/svg',
					src: '*.svg',
					dest: '<%= pkg.assetsFolder %>/_build/img/svg',
					ext: '.svg'
				}]
			}
		},
		imageoptim: {
			all: {
				options: {
					jpegMini: false,
					imageAlpha: false,
					quitAfter: false
				},
				src: [
					//TODO move images to _build
					'<%= pkg.assetsFolder %>/_build/img/content/*/*.{png,gif,jpg}',
					'<%= pkg.assetsFolder %>/_build/img/svg/*.png'
				]
			}
		},

		/*
		 * MISC
		 */
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'<%= pkg.assetsFolder %>/_build/css/*.css',
						'<%= pkg.assetsFolder %>/_build/js/*.js',
						'*.html'
					]
				},
				options: {
					watchTask: true
				}
			}
		},
		'ftp-deploy': {
			build: {
				auth: {
					host: '',
					port: 21,
					authKey: 'key1'
				},
				src: '<%= pkg.assetsFolder %>/_build',
				dest: '/public_html/_build'
			}
		}
	});


	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-css-mqpacker' );
	grunt.loadNpmTasks( 'grunt-stripmq' );
	grunt.loadNpmTasks( 'grunt-pixrem' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

	grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.loadNpmTasks( 'grunt-svg2png' );
	grunt.loadNpmTasks( 'grunt-svgmin' );
	grunt.loadNpmTasks( 'grunt-imageoptim' );

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-browser-sync' );
	grunt.loadNpmTasks( 'ftp-deploy' );


	grunt.registerTask( 'dev', [
		'css:dev',
		'js:dev',
		'browserSync',
		'watch'
	]);

	grunt.registerTask( 'build', [
		'css:build',
		'js:build',
		'images'
	]);


	grunt.registerTask( 'css:dev', [
		'sass',
		'autoprefixer',
		'css_mqpacker',
		'stripmq',
		'pixrem'
	]);

	grunt.registerTask( 'js:dev', [
		'requirejs',
		'jshint',
		'concat'
	]);

	grunt.registerTask( 'css:build', [
		'css:dev',
		'cssmin'
	]);

	grunt.registerTask( 'js:build', [
		'js:dev',
		'uglify'
	]);

	grunt.registerTask( 'images', [
		'svg2png',
		'svgmin',
		'imageoptim'
	]);

	grunt.registerTask( 'deploy', [
		'ftp-deploy:build'
	]);
};
