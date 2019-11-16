module.exports = {
    function: async function(to, subject, text){
        mailer.sendMessage({
            from: 'osu!minase support',
            to: to,
            subject: subject,
            text: text
        });
    }
}