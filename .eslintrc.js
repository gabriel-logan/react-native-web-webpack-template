module.exports = {
  root: true,
  extends: [
    "@react-native",
    "universe/native",
    "universe/web",
    "plugin:react/jsx-runtime",
  ],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "no-console": "warn",
  },
};
