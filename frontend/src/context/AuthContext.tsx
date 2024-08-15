import { createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { checkAuthStatus, loginUser, signinUser, userLogout } from '../helpers/APICommunicator';

type User= {
    name: string,
    email: string
}
type userAuth = {
    isLoggedIn: boolean,
    user: User | null;
    login: (email: string, password: string)=> Promise<void> 
    signup: (name: string, email: string, password: string)=> Promise<void>
    logout: ()=>Promise<void>
}
const AuthContext = createContext<userAuth | null>(null)
export const AuthProvider= ({children}: {children: ReactNode}) =>{
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        async function checkStatus() {
            const data = await checkAuthStatus()
            if (data){
                setUser({email: data.email, name: data.name})
                setisLoggedIn(true)
            }
        } checkStatus()
    }, [])
    const login = async(email: string, password: string) => {
        const data = await loginUser(email, password)
        if (data){
            setUser({email: data.email, name: data.name})
            setisLoggedIn(true)
        }
    }
    const signup = async(name: string, email: string, password: string) => {
        const data = await signinUser(name, email, password)
        if (data){
            setUser({email: data.email, name: data.name})
            setisLoggedIn(true)
        }
    }
    const logout = async() => {
        await userLogout()
        setisLoggedIn(false)
        setUser(null)
        window.location.reload()
    }
    const value = {
        user, 
        isLoggedIn,
        login,
        logout,
        signup
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () =>  useContext(AuthContext)