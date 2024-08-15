import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import red from '@mui/material/colors/red';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatItems from '../components/chat/ChatItems';
import {IoMdSend } from 'react-icons/io'
import { deleteChats, getUserChats, sendChatRequest } from '../helpers/APICommunicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

type Message = {
  role: "user" | "assistant",
  content: string
}
const Chat = () => {
  const auth = useAuth()
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const navigate = useNavigate()
  
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSend = async() =>{
      console.log(inputRef.current?.value)
      const content = inputRef.current?.value as string
      if (inputRef && inputRef.current){
        inputRef.current.value = ""
      }
      const newMessage: Message = {role: 'user', content}
      setChatMessages((prev) =>[...prev, newMessage])
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats])
  }

  const handleClear = async() =>{
    try{
        toast.loading("Deleting Chats", {id: "deletingChats"})
        await deleteChats()
        setChatMessages([])
        toast.success("Deleted Chats Successfully", {id: "deletingChats"})
    }catch(error){
      console.log(error)
      toast.error("Error deleting Chats", {id: "errorDeletingChats"})
    }
  }

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);
  useEffect(()=>{
    if(!auth?.user){
      return navigate("/login")
    }
  })
  return (
    <Box sx={{ display: 'flex', flex: 1, width: "100%", height: "100%", mt: 3, gap: 3 }}>
      <Box sx={{ display: { md: 'flex', xs: 'none', sm: 'none' }, flex: 0.2, flexDirection: 'column ' }}>
        <Box
          sx={{
            display: 'flex',
            width: "100%",
            height: '60vh',
            bgcolor: "rgb(17, 29, 39)", // Fixed RGB format
            borderRadius: 5,
            flexDirection: "column",
            mx: 3
          }}
        >
          <Avatar
            sx={{ mx: "auto", my: 2, bgcolor: 'white', color: 'black', fontWeight: 700 }}>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1]}
          </Avatar>
          <Typography sx = {{mx: 'auto', fontFamily: "work sans"}}>
            You are talking to a Chatbot
          </Typography>
          <Typography sx = {{mx: 'auto', fontFamily: "work sans", my: 4, p: 3}}>
            You can ask questions related to coding, business, 
            entertainment but avoid sharing personal information
          </Typography>
          <Button sx = {{width: "200px", my: "auto", color: 'white', 
            fontWeight: "700", borderRadius: 3, mx: "auto", bgcolor: red[300],
            ":hover":{
               bgcolor: red.A400
            }
            }} onClick={handleClear}>
                Clear conversation
            </Button>
        </Box>
      </Box>
      <Box sx = {{display: 'flex', flex: {md: 0.8, xs: 1, sm: 1}, flexDirection: 'column', p: 3}}>
        <Typography sx = {{textAlign: 'center', fontSize: "40px", color: 'white', mb: 2, mx: 'auto'}}>
            Model - GPT 4.0
        </Typography>
        <Box sx = {{width: '100%', height: '60vh', borderRadius: '3', mx: 'auto', display: 'flex', 
        flexDirection: 'column', overflow: 'scroll', overflowX: 'hidden', overflowY: 'auto', scrollBehavior: 'smooth'
        }}>
          {chatMessages.map((chat, index) => (
            <ChatItems content={chat.content} role = {chat.role} key = {index } />
            ))}
        </Box>
        <div style = {{
          width: '100%', 
          padding: '20px',
          borderRadius: '8', 
          backgroundColor: "rgb(17, 27, 39)", 
          display: 'flex', 
          marginRight: 'auto'}}>
        <input type='text' ref = {inputRef} style = {{
          width: '100%', 
          backgroundColor: 'transparent', 
          padding: '10px', 
          border: 'none', 
          outline: 'none', 
          color: 'white', 
          fontSize: '20px'
        }}/>
        <IconButton onClick = {handleSend} sx = {{ml: 'auto', color: 'white'}}><IoMdSend>
          </IoMdSend>
        </IconButton>
        </div>
        
      </Box>
    </Box>
  );
}

export default Chat;
