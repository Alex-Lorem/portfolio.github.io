const path = require('path');
module.exports = {
    mode: 'production',
    resolve: {
        alias: {
            'node_modules': path.join(__dirname, 'node_modules'),
        }
    },
    entry: [
        "./src/js/wscript.js",
    ],
    output: {
        filename: 'script.min.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
        ],
    },
};
