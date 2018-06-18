const EventEmitter = require('events');
const Primus = require('primus');

class PrimusWebpackPlugin {
    constructor(options) {
        const defaultOptions = {
            filename: 'primus-client.js',
            minify: false,
            primusOptions: {},
        };

        this.options = Object.assign({}, defaultOptions, options);
    }

    apply(compiler) {

        var self = this;

        compiler.plugin('emit', function (compilation, cb) {

            const filename = self.options.filename.replace(
                '[hash]',
                compilation.hash
            );

            const primus = new Primus(new EventEmitter(), self.options.primusOptions);

            const clientLib = primus.library();

            compilation.assets[filename] = {
                source() {
                    return clientLib;
                },
                size() {
                    return clientLib.length;
                },
            };

            primus.destroy();
            cb(null);
        });

        // if HtmlWebpackPlugin is being utilized, add our script to file
        compiler.plugin('compilation', function (compilation) {

            compilation.plugin(
                'html-webpack-plugin-before-html-generation',
                function (data, cb) {

                    const filename = self.options.filename.replace(
                        '[hash]',
                        compilation.hash
                    );
                    const publicPath = compilation.outputOptions.publicPath || "";
                    const finalPath = publicPath + filename;

                    // We are putting Primus script before other JavaScript files
                    // because we are expecting other bundles to use Primus
                    data.assets.js.unshift(finalPath);
                    cb(null, data);

                }
            );
        });

    }
}

module.exports = PrimusWebpackPlugin;