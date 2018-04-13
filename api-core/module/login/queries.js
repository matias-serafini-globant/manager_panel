module.exports = {
	"getUserLogin": `
		SELECT 
		    id,
		    name,
		    email,
		    password,
		    rol_id,
		    status_id
		FROM
		    user
		WHERE
		    email = :email
		        AND password = :password
		        AND status_id = 1`
};
