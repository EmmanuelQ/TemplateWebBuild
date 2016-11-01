
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	less = require('gulp-less'),
	jade = require('gulp-jade'),
	path = require('path');





gulp.task('default', ['compile', 'watch', 'serve', 'clean']);





///////////////////////////
///watch tasks
///////////////////////////

gulp.task('watch', ['watch:js', 'watch:less']);



gulp.task('watch:less', function(){

	return watch('src/less/*.less', 'compile:less');

});

gulp.task('watch:js', function(){

	return watch('src/js/*.js', 'compile:js');

});






///////////////////////////
///compile tasks
///////////////////////////

gulp.task('compile', ['compile:jade', 'compile:less', 'compile:js']);


gulp.task('compile:jade', ['clean:html'], function(){
	gulp.src('src/jade/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('dist/html'))
	.pipe(browserSync.stream());
});

gulp.task('compile:less', ['clean:css'], function(){
	gulp.src('src/less/*.less')
    .pipe(less({
   	paths: [path.join(__dirname, 'less', 'includes')]
    	}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());

});

gulp.task('compile:js', ['clean:js'], function(){
	gulp.src('src/js/*.js')
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
});


///////////////////////////
///Cleaner Tasks
///////////////////////////
gulp.task('clean', ['clean:html', 'clean:css', 'clean:js']);

gulp.task('clean:html'), function(){
	
	return del('dist/html/*.html');
};

gulp.task('clean:css'), function(){
	return del('dist/css/*.css');

}

gulp.task('clean:js'), function(){
	return del('dist/js/*.js');

}






// ///////////////////////////////////////////
// Browser-Sync Tasks
// ///////////////////////////////////////////


gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: 'dist',
		}
		
	});	

	gulp.watch('src/jade/*.jade', ['compile:jade']);
	gulp.watch("src/css/*.css", ['compile:css']);

	
});