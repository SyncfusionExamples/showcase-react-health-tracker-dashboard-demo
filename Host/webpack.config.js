const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8050/",
    // publicPath: "https://npmci.syncfusion.com/react-conference/fitness-app/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8050,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      }
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "Host",
      filename: "remoteEntry.js",
      remotes: {
        Activities: 'Activities@http://localhost:8051/remoteEntry.js',
        Profile: 'Profile@http://localhost:8052/remoteEntry.js',
        Diet: 'Diet@http://localhost:8053/remoteEntry.js',
        Fasting: 'Fasting@http://localhost:8054/remoteEntry.js'

        // Activities: 'Activities@https://npmci.syncfusion.com/react-conference/fitness-app-activities/remoteEntry.js',
        // Profile: 'Profile@https://npmci.syncfusion.com/react-conference/fitness-app-profile/remoteEntry.js',
        // Diet: 'Diet@https://npmci.syncfusion.com/react-conference/fitness-app-diet/remoteEntry.js',
        // Fasting: 'Fasting@https://npmci.syncfusion.com/react-conference/fitness-app-fasting/remoteEntry.js'
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
