var express = require('express');
var router = express.Router();
var indexRouter = require('./index');
var userRouter = require('./user');
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  console.log(req.body);

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(function(savedPage) {
    res.redirect(savedPage.route);
  })
  .catch(next);
});

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/add', function(req, res) {
  res.render('addpage');
});

// router.get('/:urlTitle', function(req, res, next) {
//   res.send(req.params.urlTitle);
//   next();
// });

router.get('/:urlTitle', function (req, res, next) {

    Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(function(foundPage){
      res.render('wikipage', {page: foundPage});
    })
    .catch(next);

  });

// router.post('/', function(req, res) {
//   res.json(req.body);
// });

router.use('/', router);
router.use('/user', userRouter);

module.exports = router;
