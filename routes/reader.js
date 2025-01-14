/** This is theroute to handle the reader-related actions. 

It includes the routes to retreive the list of published articles, 
view, like and leave comments on articles. 
*/

const express = require('express');
const router = express.Router();

// Set the main route to redirect to the home route
router.get('/', function (req, res) {
  res.redirect('/reader');
});

// Retrieve the list of published articles ordered by publication
router.get('/reader', (req, res, next) => {
  global.db.all(
    'SELECT id, title, subtitle, published FROM Article WHERE Published NOT NULL ORDER BY published DESC;',
    function (err, articles) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        res.render('reader-home.ejs', { articles, getColor });
      }
    }
  );
});

// Display a single article in read mode
router.get('/reader/:id', (req, res, next) => {
  const { id } = req.params;
  global.db.get(
    'SELECT a.id, a.title, a.subtitle, a.body, a.published, COUNT(r.userSession) as likes FROM Article a LEFT JOIN Reaction r ON r.articleId = a.id WHERE a.id = ?;',
    id,
    function (err, article) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        global.db.all(
          'SELECT body, created FROM Comment WHERE articleId = ? ORDER BY created DESC;',
          id,
          function (err, comments) {
            if (err) {
              next(err); // Send the error on to the error handler
            } else {
              res.render('reader-article.ejs', { article, comments, color: getColor(article.id) });
            }
          }
        );
      }
    }
  );
});

// Update the like count by inserting the userSession
router.post('/like/:articleId', (req, res, next) => {
  const { articleId } = req.params;
  global.db.run(
    'INSERT INTO Reaction (articleId, userSession) VALUES (?, ?);',
    [articleId, global.userSession],
    function (err) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        res.sendStatus(204);
      }
    }
  );
});

// Insert a comment on an article
router.post('/comment/:articleId', (req, res, next) => {
  const { articleId } = req.params;
  global.db.run(
    'INSERT INTO Comment (articleId, body, created) VALUES (?, ?, DATETIME());',
    [articleId, req.body.comment],
    function (err) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        res.redirect('/reader/' + articleId);
      }
    }
  );
});

function getColor(id) {
  const colors = ['primary', 'success', 'danger', 'warning', 'info'];
  return colors[id % 5];
}

module.exports = router;
