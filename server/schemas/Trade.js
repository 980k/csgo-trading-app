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
    offers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Offer"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
});

module.exports = mongoose.model("Trade", TradeSchema);