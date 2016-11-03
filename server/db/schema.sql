

-- db.knex.schema.hasTable('user').then(function(exists) {
-- 	if (!exists) {
-- 		db.knex.schema.createTable('user', function (user) {
-- 			user.increments('id').primary();
-- 			user.string('username', 100).unique();
-- 			user.string('password', 100);
-- 			user.timestamps();
-- 		}).then(function (table) {
-- 			console.log('Created Table', table);
-- 		})
-- 	}
-- });