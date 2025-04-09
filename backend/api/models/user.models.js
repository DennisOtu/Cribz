import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema)

export default User





