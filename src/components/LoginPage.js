import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import AInput from './atoms/AInput'
import AButton from './atoms/AButton'
import { getUsers } from '../modules/users'
import './LoginSignup.css'

function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const emailInput = useRef(null)
	const passwordInput = useRef(null)

	const navigate = useNavigate()

	const { users } = useSelector(state => state.users)
	const dispatch = useDispatch()

	useEffect(() => {
		!users && dispatch(getUsers())
	}, [dispatch, users])

	const onEmailHandler = event => {
		setEmail(event.currentTarget.value)
	}
	const onPasswordHandler = event => {
		setPassword(event.currentTarget.value)
	}
	const login = () => {
		if (!email) {
			emailInput.current.focus()
			return alert('아이디를 입력해주세요.')
		}
		if (!password) {
			passwordInput.current.focus()
			return alert('비밀번호를 입력해주세요.')
		}
		const result = users.find(user => user.email === email)
		result ? navigate('/login_success') : alert('가입된 정보가 없습니다.')
	}

	return (
		<div className='loginsignup'>
			<div>
				<UserOutlined className='icon' />
				<AInput
					name='email'
					type='email'
					placeholder='EMAIL'
					value={email}
					ref={emailInput}
					onChange={onEmailHandler}
					className='loginsignup_input'
				/>
				<AInput
					name='password'
					type='password'
					placeholder='PASSWORD'
					value={password}
					ref={passwordInput}
					onChange={onPasswordHandler}
					className='loginsignup_input'
				/>
				<AButton
					onClick={login}
					className='loginsignup_button'
					text='LOGIN'
				/>
			</div>
		</div>
	)
}

export default LoginPage
