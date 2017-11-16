import express from 'express';
import path from 'path';
import multer from 'multer';

import Book from '../models/Book';

const router = express.Router();


// où et comment les images/fichiers sont sauvegardés.
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, path.resolve('public', 'uploads'));
    },
    filename: (request, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });


// POST
// ajouter un nouveau livre
// route 'localhost:${config.port}/simplonBook/add'
router.get('/add', (request, response) => {
    response.render('add_book');
});
router.post('/add', upload.single('image'), (req, res) => {
    const newBook = new Book(req.body);
    console.log(req.file);
    newBook.image = "uploads/" + req.file.filename;

    newBook.save((err, book) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/simplonBook');
        // res.json({ "message": `${book.titre} a été ajouté` })
    });
    console.log(newBook.image);
});

// GET
// voir tous les livres
// route 'localhost:${config.port}/simplonBook/books'
router.get('/', (req, res) => {
    Book.find((err, books) => {
        if (err) {
            res.send(err);
        }
        res.render('bookList', { books });
        // res.json(books);
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
        res.render('book', { book });
        // res.json(book);
    })
});

// PUT
// éditer un livre par son id
// route 'localhost:${config.port}/simplonBook/books/edit/:id'
router.get('/books/edit/:id', (request, response) => {
    Book.findById(request.params.id, (error, book) => {
        if (error) {
            response.send(error);
        }
        response.render('edit_book', { book });
    });
});
router.post('/books/edit/:id', (req, res) => {
    Book.findByIdAndUpdate( req.params.id, req.body, (err) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/');
        // res.json({ "message": `${updatedBook.titre} a été modifié` })
    });
});


// DELETE
// supprimer un livre par son id
// route 'localhost:${config.port}/simplonBook/books/delete/:id'
router.get('/books/delete/:id', (req, res) => {
    Book.findByIdAndRemove( req.params.id, (err) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/');
        // res.json({ "message": `${deletedBook.titre} a été supprimé` })

    });
});






module.exports = router;
