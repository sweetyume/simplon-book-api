import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let newBook = new Schema({
    "titre": { type: String, required: true },
    "auteur": { type: String, required: true },
    "annee_de_publication": { type: String, required: true },
    "pages": { type: Number, required: true},
    "date_de_creation": { type: String, required: true },
    "image": { type: String },

}, { versionKey: false });


module.exports = mongoose.model('Book', newBook);