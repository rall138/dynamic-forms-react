function loginReducer(state = { value: false }, action) {
    let loginState = localStorage.getItem('login-state')
    switch (action.type) {
      case 'session/login':
        loginState = { value: true }
        break;
      case 'session/logout':
        loginState = { value: false }
        break;
      default:
        return loginState
    }
    
    console.log(JSON.stringify(loginState))
    localStorage.setItem("login-state", {value: loginState.value})
    return loginState
  }
  
export default loginReducer