const express = require('express');
const Trade = require('../schemas/Trade');
const Offer = require('../schemas/Offer');
const User = require("../schemas/User");

const router = express.Router();

router.get('/incoming/:userId', async(req, res) => {
    const userId = req.params.userId;

    try {
        const trades = await Trade.find({ userId: userId});
        const tradeOffers = [];
        for (const trade of trades) {
            const offers = await Offer.find({ _id: { $in: trade.offers } });
            tradeOffers.push({ trade, offers });
        }

        res.json(tradeOffers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

router.post('/newoffer', async(req, res) => {
    const newOffer = req.body;

    try {
        const offerDocument = new Offer(newOffer);
        await offerDocument.save();

        const offerId = offerDocument._id;
        const userId = newOffer.userId;
        const tradeId = newOffer.tradeId;

        await User.findByIdAndUpdate(userId, { $push: { createdOffers: offerId } });
        await Trade.findByIdAndUpdate(tradeId, { $push: { offers: offerId }});
    } catch (error) {
        console.error('Error saving offer to MongoDb:', error);
        res.status(500).end('Internal Server Error');
    }

})

module.exports = router;