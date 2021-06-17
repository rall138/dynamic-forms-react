function loginReducer(state = { value: false }, action) {
    switch (action.type) {
      case 'session/login':
        return { value: true }
      case 'session/logout':
        return { value: false }
      default:
        return state
    }
  }
  
export default loginReducer