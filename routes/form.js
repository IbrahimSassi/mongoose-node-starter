var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('comments');
/* GET users listing. */
router.get('/', function (req, res, next) {

    if (req.query.id) {
        console.log("parasm", req.query.id);
        Comment.find(function (err, comments) {
            console.log(comments);

            //or just iterate or the collection...
            Comment.findById(req.query.id, function (err, comment) {
                res.render('form',
                    {title: 'FORM Page', comments: comments, comment: comment});
            });
        });
    } else {
        Comment.find(function (err, comments) {
            console.log(comments);
            res.render('form',
                {title: 'FORM Page', comments: comments});
        });
    }
});

router.post('/', function (req, res, next) {
    console.log(req.body.comment);

    if (req.body.id) {
        Comment.findByIdAndUpdate(req.body.id, {$set: {title: req.body.comment}}, function (err, comment) {
            res.redirect('form');
        })

    } else {
        new Comment({title: req.body.comment})
            .save(function (err, comment) {
                res.redirect('form');
            })
    }


});



router.get('/delete/:id', function (req, res, next) {
    Comment.findByIdAndRemove(req.params.id, function (err, todo) {
        res.redirect('/form');
    });
});



module.exports = router;
