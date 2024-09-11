### React Native Cli - Webpack

Primeiro instale o React Native, se ja tem instalado ignore esse passo

```shell
npx @react-native-community/cli@latest init web
```

Agora instale o react native web e suas dependencias

```sh
yarn add react-dom react-native-web
```

The Babel plugin is recommended for build-time optimizations.

```sh
yarn add -D babel-plugin-react-native-web
```

Install webpack dependencies

```sh
yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader babel-plugin-module-resolver
```

Adicione os scripts necessarios para rodar o projeto no seu package.json

```json
"scripts": {
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "build:web": "rm -rf dist/ && webpack --mode=production --config webpack.config.js", // This line for build project
  "web": "webpack serve --mode=development --config webpack.config.js", // This line for dev mode
  "lint": "eslint .",
  "start": "react-native start",
  "test": "jest"
},
```

Copie o codigo para o App.tsx

```js
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <Text style={styles.subTitle}>React Native Web</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
      <Text>
        Created by:{" "}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/gabriel-logan");
          }}
        >
          <Text style={styles.link}>Gabriel Logan</Text>
        </TouchableOpacity>{" "}
        using{" "}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://necolas.github.io/react-native-web/");
          }}
        >
          <Text style={styles.link}>React Native Web</Text>
        </TouchableOpacity>
        , Webpack and TypeScript
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ADBDFF",
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
  title: {
    fontSize: 40,
  },
  subTitle: {
    fontSize: 20,
  },
  paragraph: {
    fontSize: 16,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default App;
```

Crie um arquivo chamado index.html na pasta root do seu projeto

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>React Native Web</title>
    <style>
      #app-root {
        display: flex;
        flex: 1 1 100%;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <div id="app-root"></div>
  </body>
</html>

Agora crie um arquivo na pasta raiz com o nome index.web.js

Cole o codigo abaixo

```js
import { AppRegistry } from "react-native";

import App from "./App";
import { name as appName } from "./app.json";
if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("app-root"),
});
```

Agora crie um arquivo de configuração para o webpack webpack.config.js na pasta raiz

e cole o codigo abaixo

```js
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, 'App.tsx'), // Change this to your main App file
    path.resolve(__dirname, 'src'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins: ['react-native-web'],
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'rnw_blogpost.bundle.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
};
```

Adicione configuracoes no babel.config.js

```js
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
```

Se precisar criar tests usando jest adicione a configuração abaixo no seu arquivo de test

```js
moduleNameMapper: {
   "^react-native$": "react-native-web",
},
```