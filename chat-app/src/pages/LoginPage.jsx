import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"

import Swal from 'sweetalert2'

import '../css/login-register.css'


export const LoginPage = () => {

	const { login } = useContext(AuthContext)

	const [ form, setForm ] = useState({
		email: '',
		password: '',
		rememberme: false
	})

	useEffect(() => {

		const email = localStorage.getItem('email')
		if (email) {
			setForm(form => ({
				...form,
				email,
				rememberme: true
			}))
		}

	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target
		setForm({
			...form,
			[name]: value
		})
	}

	const toggleCheck = () => {
		setForm({
			...form,
			rememberme: !form.rememberme
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		
		if (form.rememberme) {
			localStorage.setItem('email', form.email)
		} else {
			localStorage.removeItem('email')
		}

		const { email, password } = form
		console.log({ email, password });
		// Todo: Llamar al backend
		
		const ok = await login(email, password)
		if (!ok) {
			Swal.fire('Error', 'Credenciales incorrectas', 'error')
		}
	}

	const allOk = () => {
		const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

		return  regexEmail.test(form.email) && form.email.length > 0 && form.password.length > 0
	}

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">

        <form onSubmit={onSubmit} className="login100-form validate-form flex-sb flex-w">
					<span className="login100-form-title mb-3">
						Chat - Ingreso
					</span>
					
					<div className="wrap-input100 validate-input mb-3">
						<input 
							className="input100" 
							type="email" 
							name="email" 
							placeholder="Email"
							value={form.email}
							onChange={handleChange}
						/>
						<span className="focus-input100"></span>
					</div>
					
					
					<div className="wrap-input100 validate-input mb-3">
						<input 
							className="input100" 
							type="password" 
							name="password" 
							placeholder="Password"
							value={form.password}
							onChange={handleChange} 
						/>
						<span className="focus-input100"></span>
					</div>
					
					<div className="row mb-3 mx-auto">
						<div 
							className="col form-check"
							onClick={ toggleCheck }
						>
							<input 
								className="form-check-input" 
								id="ckb1" 
								type="checkbox" 
								name="remember-me" 
								checked={form.rememberme}
								readOnly
							/>
							<label className="form-check-label">
								Recordarme
							</label>
						</div>

						<div className="col text-right">
							<Link to="/auth/register" className="txt1">
								Nueva cuenta?
							</Link>
						</div>
					</div>

					<div className="container-login100-form-btn m-t-17">
						<button 
							type="submit"
							disabled={ !allOk() }
							className="login100-form-btn">
							Ingresar
						</button>
					</div>

				</form>
        </div>
      </div>
    </div>
  )
}
