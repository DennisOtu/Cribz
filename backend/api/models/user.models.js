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

UserSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email })
	if (user) {
		const isAuth = await bcrypt.compare(password, user.password)
		if (isAuth) {
			return user
		} else {
			throw Error('incorrect password')
		}
	} else {
		throw Error('incorrect email')
	}
}

const User = mongoose.model('User', UserSchema)

export default User





