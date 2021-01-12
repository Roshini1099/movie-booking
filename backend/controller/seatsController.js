import fs from 'fs';
const User = require("../models/user");
const bcrypt = require("bcryptjs");
//const { requireLogin } = require("../middleware/auth");

let rowsArray = [{
        rowName: 'A',
        seats: { 'A1': { booked: false }, 'A2': { booked: false }, 'A3': { booked: false }, 'A4': { booked: false }, 'A5': { booked: false }, 'A6': { booked: false }, 'A7': { booked: false }, 'A8': { booked: false } }
    },
    {
        rowName: 'B',
        seats: { 'B1': { booked: false }, 'B2': { booked: false }, 'B3': { booked: false }, 'B4': { booked: false }, 'B5': { booked: false }, 'B6': { booked: false }, 'B7': { booked: false }, 'B8': { booked: false } }
    }, {
        rowName: "C",
        seats: { "C1": { booked: false }, "C2": { booked: false }, "C3": { booked: false }, "C4": { booked: false }, "C5": { booked: false }, "C6": { booked: false }, "C7": { booked: false }, 'C8': { booked: false } }
    },
    {
        rowName: "D",
        seats: { "D1": { booked: false }, "D2": { booked: false }, "D3": { booked: false }, "D4": { booked: false }, "D5": { booked: true }, "D6": { booked: true }, "D7": { booked: true }, 'D8': { booked: false } }
    },
    {
        rowName: "E",
        seats: { "E1": { booked: false }, "E2": { booked: false }, "E3": { booked: false }, "E4": { booked: false }, "E5": { booked: true }, "E6": { booked: true }, "E7": { booked: true }, 'E8': { booked: false } }
    }
]

exports.getCurentSeats = (req, res) => {
    res.json({ rowsArray: rowsArray });
}

exports.usersignup = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashed_password = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashed_password,
        });
        await user.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        // console.log(err);
        return res.status(400).json({ error: err.message });
    }
}
exports.userlogin = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    /*try {
        let user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        return res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        // console.log(err);
        return res.status(400).json({ error: err.message });
    }*/

    let details = await User.findOne({ email });
    console.log(details);
    if (details) {
        return res.send("Success")
    } else
        console.log("error");
};

exports.doSeatbook = (req, res) => {
    const { rowName, seatId, sessionId } = req.body;
    console.log(sessionId);

    let errorMessage = ``;

    const newRows = rowsArray.map(row => {
        if (row.rowName === rowName) {

            //if not booked, book the seat with its sessionId
            if (!row.seats[seatId].booked) {
                row.seats[seatId].booked = true;
                row.seats[seatId].sessionId = sessionId;
            }
            //else if booked and same session user is editing,allow he user to unbook
            else if (row.seats[seatId].booked && row.seats[seatId].sessionId === sessionId) {
                row.seats[seatId].booked = false;
                delete row.seats[seatId].sessionId
            }
            //else if booked and some other ession user eidting, throw error
            else {
                errorMessage = 'This seat is recently booked. Please look for an alternative seat.'
            }
            return row;
        } else
            return row;
    })

    console.log(JSON.stringify(newRows));

    if (errorMessage)
        res.json({ rowsArray: newRows, errorMessage });
    else
        res.json({ rowsArray: newRows });
}