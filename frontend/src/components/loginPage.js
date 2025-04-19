import { useRef } from 'react'

function LoginPage () {
	const mailRef = useRef(null)
	const passRef = useRef(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		const email = mailRef.current.value
		const password = passRef.current.value
		try {
			const res = await fetch('http://localhost:8000/api/v1/auth/login', { 
				method: 'POST', 
				body: JSON.stringify({ email, password }),
				headers: {'Content-Type': 'application/json'},
				credentials: 'include'
			})
			const data = await res.json()
			if (data.user) {
				console.log('login successful')
				console.log(data)
				window.location.assign('/')
			}
		}
		catch (error) {
			console.log(error)
		}
	}

	return (
		<>
		<form onSubmit={ handleSubmit } className='mt-5'>
			<h2>Login</h2>
			<label for="email">Email</label>
			<input type="text" name="email" ref={mailRef} required />
			<div className="email error"></div>
			<label for="password">Password</label>
			<input type="password" name="password" ref={passRef} required />
			<div className="password error"></div>
			<button type="submit">login</button>
		</form>
		</>
	)
}

export default LoginPage

