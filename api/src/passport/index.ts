import passport from "passport";
import userModel from "../models/user";
import strategy from "./LocalStrategy"

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user: any, done) => {
	done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called')
	userModel.findOne(
		{ _id: id },
		'username',
		(erry, user) => {
			done(null, user)
		}
	)
})

//  Use Strategies 
passport.use(strategy)

export default passport;