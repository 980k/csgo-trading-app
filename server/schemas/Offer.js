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
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending"
    }})

module.exports = mongoose.model("Offer", OfferSchema);
