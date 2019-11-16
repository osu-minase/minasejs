module.exports = {
    function: async function(to, subject, text){
        let info = await mailer.sendMessage({
            from: 'osu!minase support',
            to: to,
            subject: subject,
            text: text
        });

        return info
    }
}