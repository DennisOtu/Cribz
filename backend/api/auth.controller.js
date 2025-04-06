import User from './models/user.models.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export const signUpGet = (req, res) => {res.send('signUpGet test')}

export const signUpPost = async (req, res) => {
	const { email, password } = req.body
	try{
		const conn = await mongoose.connect(process.env.DB_URI, { dbName: 'sample_airbnb' })
		if (conn) {
			const user = await User.create({ email, password})
			res.status(201).json(user)
			console.log(`new user signup: ${ email }`)
		}
	}
	catch (err) {
		console.log(err)
		res.status(400).send('cannot connect to users collection')
	}
}

export const login = (req, res) => {res.send('login test')}

export const logout = (req, res) => {res.send('logout test')}


