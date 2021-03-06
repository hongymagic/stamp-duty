var gulp  = require('gulp');
var p     = require('gulp-load-plugins')();
var paths = {
	all: ['lib/**/*.js', 'test/**/*.js'],
	util: ['gulpfile.js'],
	src: ['lib/**/*.js', '!lib/angular.js'],
	test: ['test/**/*.js'],
	dist: 'dist'
};

gulp.task('clean', function () {
	return gulp.src(paths.dist)
		.pipe(p.rimraf())
		.on('error', function (err) {
			p.util.log('error cleaning', err);
		});
});

gulp.task('jshint', function () {
	return gulp.src(paths.all.concat(paths.util))
		.pipe(p.jshint())
		.pipe(p.jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['jshint'], function () {
	return gulp.src(paths.test)
		.pipe(p.mocha({
			ui: 'bdd'
		}));
});

gulp.task('dist', ['dist.node', 'dist.angular']);

gulp.task('dist.node', function () {
	return gulp.src(paths.src)
		.pipe(p.concat('stamp-duty.js'))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('dist.angular', ['dist.browser'], function () {
	return gulp.src(['dist/stamp-duty.browser.js', 'lib/angular.js'])
		.pipe(p.concat('stamp-duty.angular.js'))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('dist.browser', function () {
	return gulp.src('lib/index.js')
		.pipe(p.browserify({
			standalone: 'stampduty'
		}))
		.pipe(p.rename('stamp-duty.browser.js'))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function () {
	var watcher = gulp.watch(paths.src.concat(paths.test), ['jshint', 'test']);
});

gulp.task('default', ['clean', 'test', 'dist']);