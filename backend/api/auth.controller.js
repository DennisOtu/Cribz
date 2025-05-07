import User from './models/user.models.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

dotenv.config()

// create json web token
//const maxAge = 24 * 60 * 60; //one day calculated in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.STR_SECRET, {
    expiresIn: '1d'
  });
};

export const signUp = async (req, res) => {
	const { firstName, lastName, email, password } = req.body
	try{
		const conn = await mongoose.connect(process.env.DB_URI, { dbName: 'sample_airbnb' })
		if (conn) {
			const user = await User.create({ firstName, lastName, email, password})
			const userName = user.firstName
			const token = createToken(user._id);
			//res.cookie('login_info', token, { httpOnly: true });
			res.status(201).json({ userName, token })
			console.log(`new user signup: ${ user.firstName } ` + `${ user.lastName }`)
			mongoose.connection.close()
		}
	}
	catch (error) {
		console.log(error)
		res.status(400).send('cannot connect to users collection')
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body
	try {
		const conn = await mongoose.connect(process.env.DB_URI, { dbName: 'sample_airbnb' })
		if (conn) {
			const user = await User.login(email, password)
			const userName = user.firstName
			const token = createToken(user._id);
			//res.cookie('login_info', token, { httpOnly: true })
			res.status(200).json({ userName, token })
			console.log(`user login: ${ user.firstName } ` + `${ user.lastName }`)
			mongoose.connection.close()
		}
	}
	catch (error) {
		console.log(error)
		res.status(400).json(error)
	}
}



