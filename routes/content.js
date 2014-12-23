var express = require('express');
var router = express.Router();

/*
 * GET postlist.
 */
router.get('/postlist', function(req, res) {
  var db = req.db;
  db.collection('articles').find().sort({date: -1}).toArray(function (err, items) {
    res.json(items);
  });
});

/*
* POST to addpost.
*/
router.post('/addpost', function(req, res) {
  var db = req.db;
  db.collection('articles').insert(req.body, function(err, result){
    res.send(
        (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

/*
 * DELETE to deletepost.
 */
router.delete('/deletepost/:id', function(req, res) {
  var db = req.db;
  var postToDelete = req.params.id;
  db.collection('articles').removeById(postToDelete, function(err, result) {
    res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;
