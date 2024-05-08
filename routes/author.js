/**
This is the route to handle the variuos author-related actionS.

It includes routes for retrieving lists of published articles, creating new articles, 
editing existing articles, publishing draft articles, and deleting articles.

It also includes a route for handling author settings, where the blog title, subtitle, and author's name can be updated.
 */

const express = require('express');
const router = express.Router();

// Retrieve the list of published articles ordered by publication
router.get('/', (req, res, next) => {
  global.db.all(
    'SELECT id, title, created, modified, published, (SELECT COUNT(userSession) FROM Reaction WHERE articleId = id) as likes FROM Article;',
    function (err, articles) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        res.render('author-home.ejs', { articles });
      }
    }
  );
});

// Display the create page for a new article
router.get('/new', (req, res) => {
  res.render('author-edit.ejs');
});

// Create a new article
router.post('/new', (req, res, next) => {
  const { title, subtitle, body } = req.body;
  global.db.run(
    'INSERT INTO Article (title, subtitle, body, created) VALUES (?, ?, ?, DATETIME());',
    [title, subtitle, body],
    function (err) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        res.redirect('/author');
      }
    }
  );
});

// Display the edit page for an article
router.get('/edit/:id', (req, res, next) => {
  const { id } = req.params;
  global.db.get(
    'SELECT a.id, a.title, a.subtitle, a.body, a.created, a.modified, a.published, COUNT(r.userSession) as likes FROM Article a LEFT JOIN Reaction r ON r.articleId = a.id WHERE a.id = ?;',
    id,
    function (err, article) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        res.render('author-edit.ejs', article);
      }
    }
  );
});

// Edit an existing article
router.post('/edit/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, subtitle, body } = req.body;
  global.db.run(
    'UPDATE Article SET title = ?, subtitle = ?, body = ?, modified = DATETIME() WHERE id = ?;',
    [title, subtitle, body, id],
    function (err) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        res.redirect('/author');
      }
    }
  );
});

// Publish a draft article to make it available to read
router.post('/publish/:articleId', (req, res, next) => {
  const { articleId } = req.params;
  global.db.run(
    'UPDATE Article SET published = DATETIME() WHERE id = ?;',
    articleId,
    function (err) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        res.sendStatus(204);
      }
    }
  );
});

// Delete an article from the database
router.delete('/delete/:articleId', (req, res, next) => {
  const { articleId } = req.params;
  global.db.run(
    'DELETE FROM Article WHERE id = ?;',
    articleId,
    function (err) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        res.sendStatus(204);
      }
    }
  );
});

// Author settings page, to update blog information
router.get('/settings', function (req, res) {
  const { title, subtitle, author } = global.settings;
  res.render('author-settings.ejs', { title: 'Blog Settings', subtitle, author, title });
});

// Update the blog settings
router.post('/settings', (req, res, next) => {
  const { title, subtitle, author } = req.body;
  global.db.run(
    'UPDATE Settings SET value = CASE id WHEN "title" THEN ? WHEN "subtitle" THEN ? WHEN "author" THEN ? ELSE value END WHERE id IN ("title", "subtitle", "author");',
    [title, subtitle, author],
    function (err) {
      if (err) {
        next(err); // Send the error on to the error handler
      } else {
        global.settings = { title, subtitle, author };
        res.redirect('/author');
      }
    }
  );
});

module.exports = router;
