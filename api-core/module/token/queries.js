module.exports = {
	"getUserLogin": `
		SELECT 
		    id, name, email, password, level, phone, status_id
		FROM
		    user
		WHERE
		    name = :name
		        AND password = :password`,
};