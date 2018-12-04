/**
 * Created by cherish on 2018/12/4.
 */

const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const dev = require('./webpack.dev.js');

const app = express();

const compiler = webpack(dev);

app.use(webpackDevMiddleware(compiler, {
    publicPath: dev.output.publicPath
}));

app.listen(8082, function () {
    console.log('Example app listening on port 8082!\n');
});

