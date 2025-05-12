import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
//		lowercase: true
	},
	password: {
		type: String,
		required: true,
		minLength: 6
	}
});

UserSchema.pre('save', async function (next){
	const salt = await bcrypt.genSaltSync(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

UserSchema.statics.login = async function (email, password) {
	try{
		const user = await this.findOne({ email })
		const match = await bcrypt.compare(password, user.password)
		if (match && user.firstName) {
			return user
		}
	}
	catch (error) {
		console.log(error)
	}
}

const User = mongoose.model('User', UserSchema)

export default User





