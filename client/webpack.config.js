const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    filename: "bundle.js"
  },
  devServer: {
  	historyApiFallback: true
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
  	rules: [
		{
			test: /\.(js|jsx|css)$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
		      presets: ['@babel/react', '@babel/preset-env'],
		      plugins: ['@babel/proposal-class-properties']
		    }
		},
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }
  	]
  }
};
