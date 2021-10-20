const path = require("path");

module.exports = (env) => {
  return {
    entry: {
      index: "./src/index.ts",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2",
    },
    devtool: "source-map",
    module: {
      rules: [
        { test: /\.ts$/, loader: "ts-loader" },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".d.ts"],
    },
  };
};
