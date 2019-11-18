module.exports = {
    function: async function(username){
        const query = `SELECT * FROM users WHERE username="${username}"`;
        const [user] = await db.query(query);
        return user[0].id;
        
    }
}