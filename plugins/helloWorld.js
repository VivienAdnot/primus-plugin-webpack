class HelloWorld {
    //compiler is an instance of Tapable
    apply(compiler) {

        // for webpack < 4
        compiler.plugin('done', () => {
            console.log('Hello world from plugin :)');
        });

        // compiler.hooks.done.tap('HelloWorld', () => {
        //     console.log('Hello world from plugin');
        // });

    }
}

module.exports = HelloWorld;