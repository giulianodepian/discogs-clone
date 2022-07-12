import { Strategy } from 'passport-local';
import userModel from "../models/user";

const strategy = new Strategy(
	{
		usernameField: 'username',
        passwordField: 'password'
	},
	async function(username, password, done) {
		userModel.findOne({ username: username }, (err: any, user: any) => {
			if (err) {
				return done(err)
			}
			if (!user) { 
				return done(null, false, { message: 'Incorrect username' })
			}
			user.comparePassword(password, function(err: any, isMatch: boolean) {
                if (err) return done(err)
                if (isMatch) return done(null, user)
                else return done(null, false, { message: 'Incorrect password' })
			} 
            )
		})
	}
)

export default strategy