import express, {Request} from "express";
import userModel from "../models/user";
import passport from "../passport";
import * as fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import * as path from 'path';


const router = express.Router();

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
    destination: (req: any, file: Express.Multer.File, callback: DestinationCallback) => {
        callback(null, path.join(__dirname, '..', "userImages"))
    },
    filename: (req: any, file: Express.Multer.File, callback: FileNameCallback) => {
        callback(null, file.fieldname + "-" + req.user?.username)
    }
});

const upload = multer({storage: fileStorage});

router.get('/checkuser', (req, res) => {
    if (req.isAuthenticated()) res.send({logged: true})
    else res.send({logged: false})
});

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
});

router.post('/login', passport.authenticate('local'), (req: any, res) => {
    res.send(req.user.username)
});

router.post('/logout', (req: any, res, next) => {
    req.logout(function(err: Error) {
        if (err) {return next(err)}
        res.send("Succefully LogOut");
    });
});

router.post('/update', upload.single('image'), async (req: any, res) => {
        const updatedDocument = {
            'realName': req.body.realname,
            'profile': req.body.profile,
            'ubication': req.body.location,
            'website': req.body.webpage,
            'image': {
                data: fs.readFileSync(path.join(__dirname, '..', 'userImages', req.file.filename)),
                contentType: 'image/png'
            }
        };
        const updateRes: any = await userModel.updateOne({'username': req.user.username}, updatedDocument);
        if (updateRes.nModified != 0) res.status(200).send('Update Success');
        else res.status(500).send("Update Failed");
})

router.get('/currentuser', (req: any, res) => {
    userModel.findOne({'username': req.user?.username}, function(err: Error, user: any) {
        if (err) res.status(500).send(err);
        else res.status(200).send(user);
    })
})

export default router;