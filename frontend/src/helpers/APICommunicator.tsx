import axios from "axios"

export const loginUser = async (email: string , password: string) =>{
    const res = await axios.post("/user/login", {email, password})
    if (res.status != 200){
        throw new Error("Unable to Login")
    }
    else{
        const data = await res.data
        return data
    }
}

export const signinUser = async (name: string, email: string , password: string) =>{
    const res = await axios.post("/user/signin", {name, email, password})
    if (res.status != 201){
        throw new Error("Unable to Signup")
    }
    else{
        const data = await res.data
        return data
    }
}

export const checkAuthStatus = async () =>{
    const res = await axios.get("/user/auth-status")
    if (res.status != 200){
        throw new Error("Unable to Authenticate")
    }
    else{
        const data = await res.data
        return data
    }
}

export const sendChatRequest = async (message: string) =>{
    const res = await axios.post("/chats/new", {message}) 
    if (res.status != 200){
        throw new Error("Unable to send chat")
    }
    else{
        const data = await res.data
        return data
    }
}

export const getUserChats = async () =>{
    const res = await axios.get("/chats/all-chats") 
    if (res.status != 200){
        throw new Error("Unable to send chat")
    }
    else{
        const data = await res.data
        return data
    }
}

export const deleteChats = async () =>{
    const res = await axios.delete("/chats/delete-chats") 
    if (res.status != 200){
        throw new Error("Unable to delete chats")
    }
    else{
        const data = await res.data
        return data
    }
}

export const userLogout = async () =>{
    const res = await axios.delete("/user/logout") 
    if (res.status != 200){
        throw new Error("Unable to delete chats")
    }
    else{
        const data = await res.data
        return data
    }
}