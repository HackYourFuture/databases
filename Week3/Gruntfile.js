// Gruntfile.js

module.exports = grunt => {
  grunt.initConfig({
    execute: {
      target: {
        src: ['index.js'],
      },
    },
    watch: {
      scripts: {
        files: ['index.js'],
        tasks: ['execute'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');
};
