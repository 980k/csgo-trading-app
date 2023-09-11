const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema({
    tradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trade"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    offered: [
        {
            wear: String,
            knife: String,
            finish: String
        }
    ],
    for: [
        {
            wear: String,
            knife: String,
            finish: String
        }
    ],
    status: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
