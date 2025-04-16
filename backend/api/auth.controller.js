import User from './models/user.models.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

dotenv.config()

// create json web token
const maxAge = 24 * 60 * 60; //one day calculated in seconds
const createToken = (id) => {
  return jwt.sign({ id }, 'very long top secret string', {
    expiresIn: maxAge
  });
};

export const signUp = async (req, res) => {
	const { email, password } = req.body
	try{
		const conn = await mongoose.connect(process.env.DB_URI, { dbName: 'sample_airbnb' })
		if (conn) {
			const user = await User.create({ email, password})
			const token = createToken(user._id);
			res.cookie('jwt', token, { httpOnly: true });
			//res.setHeader('Set-Cookie', `jwt=${token}`)
			res.status(201).json({ user: user._id })
			console.log(`new user signup: ${ user.email }`)
		}
	}
	catch (err) {
		console.log(err)
		res.status(400).send('cannot connect to users collection')
	}
}

export const login = (req, res) => {res.send('login test')}

export const logout = (req, res) => {res.send('logout test')}


