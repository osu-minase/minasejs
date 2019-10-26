//just a test
const router = require('express').Router();
router.get('/', (req, res) => {
    res.render('./pages/homepage');
});


module.exports = router;