const User = require('./../models/user.js');

// define Auth middleware
let auth = (req, res, next) => {

	// Get token from cookies in request
	let token = req.cookies.auth;

	// find user by provided token
	User.findByToken(token, (err, user) => {
		if(err) throw err;

		// if not user is found, return error in json format
        if(!user) return res.json({
            error :true
        });

        // save token to request
        req.token = token;

        // save user to request
        req.user =user;

        // next
        next();
	});
}

module.exports = {auth};