const express = require('express');
const router = express.Router();

//@route GET api/posts/test
//@desc Test post route
//@desc Public
router.get('/test',(req,res) => {
    res.json({ msg  : "posts workds" })
});

module.exports = router;