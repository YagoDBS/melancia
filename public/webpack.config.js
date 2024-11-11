const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    plugins: [
        new NodePolyfillPlugin(),
    ],
    resolve: {
        fallback: {
            "fs": false,
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "stream": require.resolve("stream-browserify")
        },
    },
};
