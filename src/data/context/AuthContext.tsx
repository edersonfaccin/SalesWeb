import { createContext, useEffect, useState } from "react";
import route from 'next/router'
import Cookies from 'js-cookie'
import { postMethod } from "../../utils/ServiceApi";
import { userApi } from "../../utils/Environment";

interface ISignInModel {
    iduser?: string
    idcompany?: string
    email?: string
    access_token?: string
}

interface AuthContextProps {
    user: ISignInModel,
    loading?: boolean,
    requestReset?: (email: string) => Promise<void>,
    registerUser?: (email: string, password: string) => Promise<void>,
    loginEmail?: (email: string, password: string) => Promise<void>,
    logout?: () => Promise<void>,
    errorMessage?: string
}

const AuthContext = createContext<AuthContextProps>({
    user: {},
    loading: false,
    requestReset: null,
    registerUser: null,
    loginEmail: null,
    logout: null,
    errorMessage: null
})

export const AuthProvider = (props) => {
    const [ user, setUser ] = useState<ISignInModel>(null)
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ errorMessage, setErrorMessage ] = useState<string>()

    const loginEmail = async(email: string, password: string) => {
        const data = {
            email,
            password
        }

        setErrorMessage('')

        try {
            setLoading(true)

            postMethod(userApi, 'login', data).then((respUser: any) => {
                setUser(respUser)
                route.push('/')
            })
        }
        catch(error) {
            setErrorMessage('Usuário ou senha inválidos')
            setLoading(false)
        } finally {
            setLoading(false)
        } 
    }

    const registerUser = async(email: string, password: string) => {
        setErrorMessage('')

        try {
            setLoading(true)
            const resp = null///await firebase.auth().createUserWithEmailAndPassword(email, password)
            //route.push('/')
        }
        catch(error) {
            setErrorMessage(error?.message)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const requestReset = async(email: string) => {
        setErrorMessage('')

        try {
            setLoading(true)
            //await firebase.auth().sendPasswordResetEmail(email)
            route.push('/')
        }
        catch(error) {
            setErrorMessage(error?.message)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const logout = async() => {
        try {
            setLoading(true)
            //await firebase.auth().signOut()
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            requestReset,
            loginEmail,
            logout,
            registerUser,
            errorMessage
        }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContext