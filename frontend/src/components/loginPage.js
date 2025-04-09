function LoginPage () {
	
	return (
	
		<form action="/signup" className='mt-5'>
			<h2>Login</h2>
			<label for="email">Email</label>
			<input type="text" name="email" required />
			<div class="email error">some error</div>
			<label for="password">Password</label>
			<input type="password" name="password" required />
			<div class="password error"></div>
			<button>login</button>
		</form>
	
	)
}

export default LoginPage

