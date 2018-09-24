const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    module: {
        rules: [
            {
                // Matches all PHP or JSON files in `resources/lang` directory.
                test: /resources[\\\/]lang.+\.(php|json)$/,
                loader: 'laravel-localization-loader',
            }
        ]
    }
});

// Override mix internal webpack output configuration
mix.config.webpackConfig.output = {
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/',
};

mix.js('resources/js/main.js', 'public/js/app.js')
    .sass('resources/sass/fonts.scss', 'public/css/fonts.bundle.css')
    .copyDirectory('resources/js/assets/dist/images', 'public/images')
    .copyDirectory('resources/js/assets/dist/css', 'public/css')
    .copyDirectory('resources/js/assets/dist/js', 'public/js')
    .copyDirectory('resources/js/assets/dist/vendors', 'public/vendors');
