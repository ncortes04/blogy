
class AuthService {
    getToken(){
        return localStorage.getItem('id_token');
    }
    setToken(token){
        localStorage.setItem('id_token', token)
    }
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }
    logout(){
        localStorage.removeItem('id_token')
        window.location.assign('/');
    }
    loggedIn(){
        const token = this.getToken()
        if(!token){
            return false
        }
        return true
    }
}

export default new  AuthService()