import express from 'express';
import path from 'path';

import Book from '../models/Book';
// const express = require('express');
// const mongoose = require('mongoose');

// const Animal = require('../models/Animal');

const router = express.Router();

// POST
// créer un nouvel animal
// route 'app/pet/add'
router.post('/add', (req, res) => {
    const newBook = new Book(req.body);
    newBook.save((err, book) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": `${book.name} a été ajouté` })
    });
});



module.exports = router;
