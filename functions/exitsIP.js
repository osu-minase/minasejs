module.exports = {
    function: async function(ip){
        let [response] = await db.query(`SELECT * FROM ip_user WHERE ip="${ip}"`);
        return response[0].ip && response[0] || null;
    }
}