var UserDao = module.exports = {
	syncUser: function(db) {

		User = db.define(
			"user",
			{
		    	id 			: {
		    		type: 'serial',
		    		key: true
		    	},
		        username   	: String,
		        password	: String
		    }
	    );
	},
	findByUsername: function(username, callback) {
		User.find({username: username}, { limit : 1}, function(err, users) {
		    users.forEach(function(user) {
		    	return callback(null, user);
		    });
		    
		    if (!users.length) {
		    	return callback(null, null);
		    }
		});
	}
};