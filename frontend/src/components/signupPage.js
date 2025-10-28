import { useRef } from 'react'

function SignupPage() {
	const firstNameRef = useRef(null)
	const lastNameRef = useRef(null)
	const mailRef = useRef(null)
	const passRef = useRef(null)

	const handleSubmit = async (e) => {
		e.preventDefault()

		const firstName = firstNameRef.current.value
		const lastName = lastNameRef.current.value
		const email = mailRef.current.value
		const password = passRef.current.value

		try {
			const res = await fetch('http://localhost:8000/api/v1/auth/signup', { 
				method: 'POST', 
				body: JSON.stringify({ firstName, lastName, email, password }),
				headers: {'Content-Type': 'application/json'},
				credentials: 'include'
			})
			const data = await res.json()
			if (data) {
				localStorage.setItem('user', JSON.stringify(data))
				window.location.assign('/')
			}
		}
		catch (error) {
			console.log(error)
		}
	}

	return (
	<div style={{ backgroundColor: 'var(--lightGrey)', height: '100vh', padding: '8rem', display: 'flex', justifyContent: 'center' }}>
		<div className='signUpForm'>
			<form onSubmit={ handleSubmit }>
				<h2 style={{ color: 'var(--cribzBlue)' }}>Sign Up</h2>
				
				<label for="firstName">First Name</label>
				<input type="text" name="firstName" ref={firstNameRef} required />
				<div className="firstName error"></div>
				
				<label for="lastName">Last Name</label>
				<input type="text" name="lastName" ref={lastNameRef} required />
				<div className="lastName error"></div>
				
				<label for="email">Email</label>
				<input type="text" name="email" ref={mailRef} required />
				<div className="email error"></div>
				
				<label for="password">Password</label>
				<input type="password" name="password" ref={passRef} required />
				<div className="password error"></div>
				
				<button className='butn' type="submit">Sign Up</button>
			</form>
		</div>
	</div>
	)
}

export default SignupPage


