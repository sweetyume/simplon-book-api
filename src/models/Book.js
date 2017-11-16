import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let newBook = new Schema({
    "titre": { type: String, required: true },
    "auteur": { type: String, required: true },
    "année_de_publication": { type: String, required: true },
    "pages": { type: Number, required: true},
    "date_de_création": { type: String, required: true }
});


