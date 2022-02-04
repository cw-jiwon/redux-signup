import * as api from '../api'

const GET_USERS = 'GET_USERS'
const POST_USER = 'POST_USER'
const DELETE_USER = 'DELETE_USER'
const ERROR = 'ERROR'

export const getUsers = () => async dispatch => {
	try {
		const users = await api.getUsers()
		dispatch({
			type: GET_USERS,
			users
		})
	} catch (error) {
		dispatch({
			type: ERROR,
			error
		})
	}
}

export const postUser = email => async dispatch => {
	try {
		const user = { ...email, id: initialState.nextId++ }
		dispatch({
			type: POST_USER,
			user
		})
	} catch (error) {
		dispatch({
			type: ERROR,
			error
		})
	}
}

export const deleteUser = id => async dispatch => {
	try {
		dispatch({
			type: DELETE_USER,
			id
		})
	} catch (error) {
		dispatch({
			type: ERROR,
			error
		})
	}
}

const initialState = {
	users: null,
	nextId: 11
}

export default function users(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			const users = action.users
			return {
				...state,
				users
			}
		case POST_USER:
			const all_users = state.users.concat(action.user)
			return {
				...state,
				users: all_users
			}
		case DELETE_USER:
			const left_users = state.users.filter(item => item.id !== action.id)
			return {
				...state,
				users: left_users
			}
		default:
			return state
	}
}
