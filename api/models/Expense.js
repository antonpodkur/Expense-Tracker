const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default:Date.now 
        },
        time: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
        },
        amount: {
            type: Number,
            required: true
        },
        comment: {
            type: String
        },
        user_id: {
            type: String,
            required: true
        }
    },
    {
        collection: 'expenses'
    }
);

const model = mongoose.model('ExpenseSchema',ExpenseSchema);
module.exports = model;