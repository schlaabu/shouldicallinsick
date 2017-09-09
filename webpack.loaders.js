module.exports = [{
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['env']
        }
    }
}, {
    test: /\.dot$/,
    use: {
        loader: 'dotjs-loader',
    }
}];
