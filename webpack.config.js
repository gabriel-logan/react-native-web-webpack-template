const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const appDirectory = path.resolve(__dirname);
const { presets, plugins } = require(`${appDirectory}/babel.config.web.js`);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, "index.web.js"), // Entry to your application
    path.resolve(__dirname, "App.tsx"), // Change this to your main App file
    path.resolve(__dirname, "src"),
    ...compileNodeModules,
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets,
      plugins,
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: "@svgr/webpack",
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: {
    app: path.join(__dirname, "index.web.js"),
  },
  output: {
    path: path.resolve(appDirectory, "dist"),
    publicPath: "./", // Using ./ for the github pages, change to / for local or other hosting
    filename: "[name].[contenthash].js", // Use placeholders for unique filenames
  },
  resolve: {
    extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".web.js", ".js"],
    alias: {
      "react-native$": "react-native-web",
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      // fix for @react-navigation@7 errors
      {
        test: /\.m?js$/,
        include: [
          path.resolve(
            __dirname,
            "node_modules/@react-navigation/core/lib/module"
          ),
          path.resolve(
            __dirname,
            "node_modules/@react-navigation/elements/lib/module"
          ),
          path.resolve(
            __dirname,
            "node_modules/@react-navigation/native/lib/module"
          ),
          path.resolve(
            __dirname,
            "node_modules/@react-navigation/native-stack/lib/module"
          ),
          // bottom-tabs doesn't error but is included for consistendcy
          path.resolve(
            __dirname,
            "node_modules/@react-navigation/bottom-tabs/lib/module"
          ),
        ],
        resolve: {
          fullySpecified: false, // fix for @react-navigation@7 errors
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    maxAssetSize: 512000, // 500kb
    maxEntrypointSize: 512000, // 500kb
  },
};
