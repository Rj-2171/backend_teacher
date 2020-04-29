const express = require('express');
const router = express.Router();



// GET ALL THE INSTIUTES
router.get('/', (req, res, next) => {

    res.json({
        success: true,
        msg: "Welcome to our API"
    });
});



module.exports = router;