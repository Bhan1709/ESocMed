import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            friends,
            email,
            password,
            picturePath,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(); //wait for bcrypt to create a random salt
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = User({
            firstName,
            lastName,
            friends,
            email,
            password: passwordHash,
            picturePath,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), //Functionality not implemented for sake of simplicity
            impressions: Math.floor(Math.random() * 10000) //Functionality not implemented for sake of simplicity
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGIN USER */
export const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};