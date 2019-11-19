module.exports = {
    function: async function(to, subject, text){
        let info = await mailer.sendMail({
            from: 'osu!minase support',
            to: to,
            subject: subject,
            text: text
        });

        return info
    }
}