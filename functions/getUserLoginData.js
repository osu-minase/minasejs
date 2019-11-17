module.exports = {
    function: async function(userid){
        const resp = await db.query(`select * from users where id=${userid}`);
        if(!resp) return false;
        return resp[0];
    }
}