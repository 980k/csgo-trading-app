const express = require('express');
const Trade = require('../schemas/Trade');
const Offer = require('../schemas/Offer');
const User = require("../schemas/User");

const router = express.Router();

router.get('/all/:userId', async(req, res) => {
    const userId = req.params.userId;

    try {
        const trades = await Trade.find({ userId: userId });
        const tradeOffers = [];
        const associatedTrades = [];

        for (const trade of trades) {
            const offers = await Offer.find({ _id: { $in: trade.offers } });
            tradeOffers.push({ trade, offers });
        }

        const offers = await Offer.find({ userId: userId });
        for (const offer of offers) {
            const trade = await Trade.findOne({ _id: offer.tradeId });
            associatedTrades.push({ offer, trade });
        }

        const combinedData = {
            tradeOffers: tradeOffers,
            associatedTrades: associatedTrades,
        };

        res.json(combinedData);

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

router.post('/update/:_id', async(req, res) => {
    const id = req.params._id;
    const newStatus = req.body.status;

    try {
        const updatedOffer = await Offer.findByIdAndUpdate(id, { status: newStatus });

        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        return res.status(200).json({ message: 'Offer updated successfully', updatedOffer });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})

module.exports = router;