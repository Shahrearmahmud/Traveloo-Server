import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

//user registration
export const register = async (req, res) => {
    try {
        //hashing password 
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        })

        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Successfully created",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create.try again",
        });

    }
}

// user login
export const login = async (req, res) => {

    const email = req.body.email
    try {
        const user = await User.findOne({ email })
        // if user doesn't exist 

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        // if user exist then check the password or compare the pass
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        //if password is incorrect 

        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }
        const { password, role, ...rest } = user._doc;

        //create jwt token 

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "300d" });

        // Set token in the browser cookies and the response to the client 

        // res.cookie('accessToken', token, {
        //     httpOnly: true,
        //     expires: token.expiresIn
        // }).res.status(200).json({
        //     success: true,
        //     message: "Successfully login",
        //     data: { ...rest }
        // });
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000), // Set the cookie to expire in 15 days
        }).status(200).json({
            token,
            data: { ...rest },
            role,

        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Login.try again",
        });

    }
}