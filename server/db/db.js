var knex = require('knex')({
	client : 'mysql',
	connection : {
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_PORT 
  }
});


knex.schema.hasTable('users').then(function(exists) {
	if (!exists) {
		knex.schema.createTable('users', function (user) {
			user.increments('id').primary();
			user.string('username', 100).unique();
			user.string('email', 100).unique();
			user.string('password', 100);
			// user.timestamps();
		}).then(function (table) {
			console.log('Created Table', table);
		})
	}
});

//Schema to store chat messages in the database
knex.schema.hasTable('channel').then(function(exists) {
 if (!exists) {
   knex.schema.createTable('channel', function (channel) {
     channel.increments('id').primary();
     channel.string('name', 100).unique();
     channel.timestamps();
   }).then(function (table) {
     console.log('Created Table', table);
   })
 }
});

// db.knex.schema.hasTable('users_channel').then(function(exists) {
//  if (!exists) {
//    db.schema.createTable('user_channel', function (user_channel) {
//      users_channel.increments('id').primary();
//      users_channel.integer('userID').unsigned().references(users.id);
//      users_channel.integer('channelID').unsigned().references(channel.id);
//      users_channel.string('message', 300);
//      users_channel.timestamps();
//    }).then(function (table) {
//      console.log('Created Table', table);
//    })
//  }
// });

// db.knex.schema.hasTable('directmessage').then(function(exists) {
// 	if (!exists) {
// 		db.schema.createTable('directmessage', function (directmessage) {
// 			directmessage.increments('id').primary();
// 			directmessage.string('name', 100).unique();
// 			directmessage.timestamps();
// 		}).then(function (table) {
// 			console.log('Created Table', table);
// 		})
// 	}
// });

// db.knex.schema.hasTable('users_directmessage').then(function(exists) {
// 	if (!exists) {
// 		db.schema.createTable('users_directmessage', function (user_channel) {
// 			users_directmessage.increments('id').primary();
// 			users_directmessage.integer('userID').unsigned().references(users.id);
// 			users_directmessage.integer('directmessageID').unsigned().references(directmessage.id);
// 			users_directmessage.string('message', 300);
// 			users_directmessage.timestamps();
// 		}).then(function (table) {
// 			console.log('Created Table', table);
// 		})
// 	}
// });





module.exports = knex;



