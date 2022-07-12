import express from "express";
import userModel from "../models/user";
import passport from "../passport";

const router = express.Router();

router.get('/checkuser', (req, res) => {
    if (req.isAuthenticated()) res.send({logged: true})
    else res.send({logged: false})
})

router.post('/create', async (req, res) => {
    console.log(req.body);
    const newUser = new userModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        isAdmin: false,
    })
    try {
        await newUser.save();
        res.status(200).send({message: "Account Created Succefully"});
    } catch(err: any) {
        if (err.name === "ValidationError") {
            const errors: Record<string, any> = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            })
            return res.status(400).send(errors);
        }
    }
})

router.post('/login', passport.authenticate('local'), (req: any, res) => {
    res.send(req.user.username)
})

export default router;