const express = require("express");
const router = express.Router();
const User = require("../schemas/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async(req, res) => {
    const {username, password} = req.body;

    try {
        let user = await User.findOne({username});
        if(user) {
            return res.status(400).json({
                msg:"User already exists"
            });
        }
        user = new User({
            username,
            password
        });
        const s = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, s);

        await user.save();

        res.status(200).json({
            msg: "User created successfully"
        });
    } catch(error) {
        res.status(500).json({
            msg: error.message
        });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username: username });

        if(!user) {
            return res.status(400).json({
                msg: "Invalid username"
            });
        }

        const flag = await bcrypt.compare(password, user.password);
        if(!flag) {
            return res.status(400).json({
                msg: "Invalid password"
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'secret-key', { expiresIn: 10000 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                token,
            });
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
});

router.get("/secure-api", auth, async (req, res) => {
    try {
        res.json({
            msg : 'Secure Api Tested'
        });
    } catch (e) {
        res.send({ msg: "Error in Fetching user" });
    }
});

module.exports = router;