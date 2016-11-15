var knex = require('knex')({
	client : 'mysql',
	connection : {
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_PORT 
  }
});

// knex.schema.dropTableIfExists('users');
knex.schema.hasTable('users').then(function(exists) {
	if (!exists) {
		knex.schema.createTable('users', function (user) {
			user.increments('id').primary();
			user.string('username', 100).unique();
			user.string('email', 100).unique();
			user.string('password', 100);
      user.string('first', 100);
      user.string('last', 100);
      user.string('phone', 100);
      user.string('about', 10000);
      user.string('github', 1000);
      user.string('facebook', 1000);
      user.string('twitter', 1000);
      user.string('linkedin', 1000);
			user.timestamps();
		}).then(function (table) {
			console.log('Created Table', table);
		})
	}
});

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

knex.schema.hasTable('channel_messages').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('channel_messages', function (channel_messages) {
      channel_messages.increments('id').primary();
      channel_messages.integer('userID').unsigned().references('users.id');
      channel_messages.integer('channelID').unsigned().references('channel.id');
      channel_messages.string('message', 300);
      channel_messages.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    })
  }
});

knex.schema.hasTable('channel_users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('channel_users', function (channel_users) {
      channel_users.increments('id').primary();
      channel_users.integer('userID').unsigned().references('users.id');
      channel_users.integer('channelID').unsigned().references('channel.id');
      channel_users.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    })
  }
});

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



