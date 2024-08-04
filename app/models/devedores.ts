import mongoose, { Schema } from 'mongoose';

const item = new Schema({
    amount: { type: Number, default: 0 },
    nome: { type: String, required: true }
});

let modeledFix = mongoose.models.Devedores

if (!modeledFix) {
    modeledFix = mongoose.model("Devedores", item)
    modeledFix.createIndexes()
}

const Devedores = modeledFix;

export { Devedores };