var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('comments');
/* GET users listing. */
router.get('/', function (req, res, next) {
    Comment.find(function (err, comments) {
        console.log(comments);
        res.render('form',
            { title: 'FORM Page', comments: comments });

    })
});

router.post('/', function (req, res, next) {
    console.log(req.body.comment);

    new Comment({ title: req.body.comment })
        .save(function (err, comment) {
            res.redirect('form');
        })

});


router.get('/delete/:id', function (req, res, next) {
    Comment.findByIdAndRemove(req.params.id, function (err, todo) {
        res.redirect('/form');
    });
});



module.exports = router;
