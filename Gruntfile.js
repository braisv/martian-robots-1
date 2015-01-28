module.exports = function(grunt) {

  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          name: "main",
          baseUrl: "src/scripts/modules",
          mainConfigFile: "src/scripts/modules/main.js",
          out: "src/scripts/main-min.js",
          generateSourceMaps: true,
          preserveLicenseComments: false,
          optimize: "uglify2"
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['src/scripts/modules/*.js'],
      tasks: ['requirejs']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['requirejs']);

};