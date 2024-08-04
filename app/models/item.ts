import mongoose, { Schema } from 'mongoose';

const item = new Schema({
    id: { type: String, required: true },
    supply: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    state_type: { type: String, default: 'STOCKED' }
});

let modeledFix = mongoose.models.Item

if (!modeledFix) {
    modeledFix = mongoose.model("Item", item)
    modeledFix.createIndexes()
}

const Item = modeledFix;

export { Item };