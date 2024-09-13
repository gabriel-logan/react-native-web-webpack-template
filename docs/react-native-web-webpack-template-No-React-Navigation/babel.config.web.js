module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "^react-native$": "react-native-web",
        },
      },
    ],
    "react-native-web",
  ],
};
