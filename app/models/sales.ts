import mongoose, { Schema } from 'mongoose';

const item = new Schema({
  total: { type: Number, default: 0 },
  timestamp: { type: Number, default: 0 },
  type: { type: String, default: "CAIXA" }
});

let modeledFix = mongoose.models.Sales

if (!modeledFix) {
  modeledFix = mongoose.model("Sales", item)
  modeledFix.createIndexes()
}

const Sales = modeledFix;

export { Sales };