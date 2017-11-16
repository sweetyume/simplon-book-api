import express from 'express';
import path from 'path';

import Book from '../models/Book';

const router = express.Router();

// POST
// ajouter un nouveau livre
// route 'localhost:${config.port}/simplonBook/add'
router.post('/add', (req, res) => {
    const newBook = new Book(req.body);
    newBook.save((err, book) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": `${book.titre} a été ajouté` })
    });
});

// GET
// voir tous les livres
// route 'localhost:${config.port}/simplonBook/books'
router.get('/books', (req, res) => {
    Book.find((err, books) => {
        if (err) {
            res.send(err);
        }
        res.json(books);
    });
});

// GET
// voir un livre par son id
// route 'localhost:${config.port}/simplonBook/books/:id'
router.get('/books/:id', (req, res) => {
    Book.findById( req.params.id, (err, book) => {
        if (err) {
            res.send(err);
        }
        res.json(book);
    })
});

// POST
// éditer un livre par son id
// route 'localhost:${config.port}/simplonBook/books/edit/:id'
router.post('/books/edit/:id', (req, res) => {
    Book.findByIdAndUpdate( req.params.id, req.body, (err, updatedBook) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": `${updatedBook.titre} a été modifié` })
    });
});

// DELETE
// supprimer un livre par son id
// route 'localhost:${config.port}/simplonBook/books/delete/:id'
router.delete('/books/delete/:id', (req, res) => {
    Book.findByIdAndRemove( req.params.id, (err, deletedBook) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": `${deletedBook.titre} a été supprimé` })

    });
});







module.exports = router;
