const mongoose = require("mongoose");

const TradeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    have: [
        {
            wear: String,
            knife: String,
            finish: String
        }
    ],
    want: [
        {
            wear: String,
            knife: String,
            finish: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    offers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Offer"
        }
    ]
});

module.exports = mongoose.model("Trade", TradeSchema);