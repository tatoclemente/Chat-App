import { Link, useNavigate } from "react-router-dom"

import '../css/login-register.css'
import { useContext, useState } from "react"
import { AuthContext } from "../auth/AuthContext"
import Swal from "sweetalert2"


export const RegisterPage = () => {

	const navigate = useNavigate()
	const { register } = useContext(AuthContext)

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	})

	const handleChange = (event) => {
		const { name, value } = event.target
		setForm({
			...form,
			[name]: value
		})
	}

	const onSubmit = async (event) => {
		event.preventDefault()

		const { name, email, password } = form
		const msg = await register(name, email, password)

		
		
		if (msg !== true) {
			Swal.fire('Error', msg, 'error')
		} else {
			Swal.fire({
				icon: 'success',
				title: 'Registro exitoso',
				text: 'Ahora puedes iniciar sesión',
				showConfirmButton: false,
				timer: 1500
			})
			.then(() => navigate('/auth/login'))

		}

	}


	const allOk = () => {
		const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

		return (
			form.name.length > 0 
			&& regexEmail.test(form.email) 
			&& form.email.length > 0 
			&& form.password.length > 0
		)
	}

  return (

    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
        <form onSubmit={onSubmit} className="login100-form validate-form flex-sb flex-w">
					<span className="login100-form-title mb-3">
						Chat - Registro
					</span>

					<div className="wrap-input100 validate-input mb-3">
						<input 
							autoComplete="username"
							className="input100" 
							type="text" 
							name="name" 
							value={form.name}
							onChange={handleChange}
							placeholder="Nombre" />
						<span className="focus-input100"></span>
					</div>

					
					<div className="wrap-input100 validate-input mb-3">
						<input 
							autoComplete="username"
							className="input100" 
							type="email" 
							name="email" 
							value={form.email}
							onChange={handleChange}
							placeholder="Email" />
						<span className="focus-input100"></span>
					</div>
					
					
					<div className="wrap-input100 validate-input mb-3">
						<input 
							autoComplete="current-password"
							className="input100" 
							type="password" 
							name="password" 
							value={form.password}
							onChange={handleChange}
							placeholder="Password" />
						<span className="focus-input100"></span>
					</div>
					
					<div className="row mb-3">
						<div className="col text-right">
							<Link to="/auth/login" className="txt1">
								Ya tienes cuenta?
							</Link>
						</div>
					</div>

					<div className="container-login100-form-btn m-t-17">
						<button 
							type="submit"
							disabled={ !allOk() }
							className="login100-form-btn">
							Crear cuenta
						</button>
					</div>

				</form>
        </div>
      </div>
    </div>
  )
}
