const config={
	production: {
		API_KEY: process.env.API_KEY,
		DATABASE: process.env.MONGODB_URI,
	},
	default: {
		API_KEY: 'yetanothertestkey',
		DATABASE: 'mongodb://localhost:27017/'
	}
}

exports.get = function get(env){
	return config[env] || config.default
}