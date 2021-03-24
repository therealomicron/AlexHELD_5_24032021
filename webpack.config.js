const path = require('path');

module.exports = {
   entry: {
        home: ["/assets/scss/home.scss", "/assets/js/home.js"]
    },
    module: {
        rules: [
            {
                test: /.s[ac]ss$/i,
                use: [
                    // Translates CSS into CommonJS
                    "css-loader",
                    "postcss-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "assets/css/"),
    },
 
   };