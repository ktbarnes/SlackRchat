var knex = require('knex')({
	client : 'mysql',
	connection : {
		host : '127.0.0.1:3000'
		user : 'root',
		password: '',
		database : 'slacker' 
	}
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
	if (!exists) {
		db.schema.createTable('users', function (user) {
			users.increments('id').primary();
			users.string('username', 100).unique();
			users.string('email', 100).unique();
			users.string('password', 100);
			users.timestamps();
		}).then(function (table) {
			console.log('Created Table', table);
		})
	}
});

db.knex.schema.hasTable('directmessage').then(function(exists) {
	if (!exists) {
		db.schema.createTable('directmessage', function (directmessage) {
			directmessage.increments('id').primary();
			directmessage.string('name', 100).unique();
			directmessage.timestamps();
		}).then(function (table) {
			console.log('Created Table', table);
		})
	}
});

db.knex.schema.hasTable('users_directmessage').then(function(exists) {
	if (!exists) {
		db.schema.createTable('users_directmessage', function (user_channel) {
			users_directmessage.increments('id').primary();
			users_directmessage.integer('userID').unsigned().references(users.id);
			users_directmessage.integer('directmessageID').unsigned().references(directmessage.id);
			users_directmessage.string('message', 300);
			users_directmessage.timestamps();
		}).then(function (table) {
			console.log('Created Table', table);
		})
	}
});


db.knex.schema.hasTable('channel').then(function(exists) {
	if (!exists) {
		db.schema.createTable('channel', function (channel) {
			channel.increments('id').primary();
			channel.string('name', 100).unique();
			channel.timestamps();
		}).then(function (table) {
			console.log('Created Table', table);
		})
	}
});

db.knex.schema.hasTable('users_channel').then(function(exists) {
	if (!exists) {
		db.schema.createTable('user_channel', function (user_channel) {
			users_channel.increments('id').primary();
			users_channel.integer('userID').unsigned().references(users.id);
			users_channel.integer('channelID').unsigned().references(channel.id);
			users_channel.string('message', 300);
			users_channel.timestamps();
		}).then(function (table) {
			console.log('Created Table', table);
		})
	}
});


module.exports = db;






