module.exports = {
    
    /**
     * 
     * @param {*} id user id
     * 
     * usage:
     *     [userdata] = await util.getUserStats(1000);
     *     
     *     id: userdata.id,
     *     username: userdata.username,
     *     pp: userdata.pp_std,
     *     raw: utils.inspect(userdata)
     */
    function: async function(id){
    const res = await db.query(`SELECT * from users_stats where id=${id}`);
    return res[0];
}

}