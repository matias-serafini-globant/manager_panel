module.exports = {
	"getUser":	`
		SELECT 
		    *
		FROM
		    user
		left join client ON client.user_id = user.id
		WHERE
	    	user.id = :id`,

	"getUsers":	`
		SELECT 
		    *
		FROM
		    user
		left join client ON client.user_id = user.id
		ORDER BY id`,

	"insertUser":"INSERT INTO user SET ?",
	"insertClient":"INSERT INTO client SET ?",

	"updateUser":"UPDATE user SET ? WHERE id = ? ",
	"updateClient":"UPDATE client SET ? WHERE user_id = ? ",

	"getPassword":"SELECT password FROM user WHERE id = :id",

	"getUserByEmail":`
		SELECT 
		    id, name, email, rol_id, phone, status_id
		FROM
		    user
		WHERE
		    email = :email`,

	//"insertUserPlugin":"INSERT INTO user_plugin (user_id, plugin_id) VALUES ?",

	"deleteUser":"DELETE FROM user WHERE id = ?"
};
