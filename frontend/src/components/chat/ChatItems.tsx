import { Avatar, Box, Typography } from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';


function extractCodeFromString(message: string){
    if (message.includes("```")){
        const blocks = message.split("```")
        return blocks
    }
}

function isCodeBlock(str: string){
    if (str.includes("=") || 
    str.includes(";") || 
    str.includes("[") ||
    str.includes("]") || 
    str.includes("}") || 
    str.includes("{") ||
    str.includes("#") || 
    str.includes("//")){
        return true
    }
    else{
        return false
    }
}

const ChatItems = ({content, role}: {content: string, role: string}) => {
    const auth = useAuth()
    const messageBlocks = extractCodeFromString(content)
    return role === 'assistant'? 
    <Box sx = {{display: 'flex', padding: '2', bgcolor: '#004d5612', my: '2', gap: '2'}}>
        <Avatar sx = {{ml: '0'}}>
            <img src = 'openai.png' alt = "openai" width = {'30px'}/>
        </Avatar>
        <Box>
            {!messageBlocks && (<Typography sx = {{fontSize: '20px', }}>{content}</Typography>)}
            {messageBlocks && messageBlocks.length && messageBlocks.map((block) =>(isCodeBlock(block)?
            <SyntaxHighlighter style={coldarkCold} language='javascript'>{block}</SyntaxHighlighter>: 
            <Typography sx = {{fontSize: '20px', }}>{block}</Typography>))}
        </Box>
    </Box> 
    : <Box sx = {{display: 'flex', padding: '10', bgcolor: '#004d56', gap: '9', height: '60px'}}>
            <Avatar sx = {{ml: '0', bgcolor: 'black', color: 'white '}}>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1]}
            </Avatar>
            <Box>
            <Box>
                {!messageBlocks && (<Typography sx = {{fontSize: '20px', }}>{content}</Typography>)}
                {messageBlocks && messageBlocks.length && messageBlocks.map((block) =>(isCodeBlock(block)?
                <SyntaxHighlighter style={coldarkCold} language='javascript'>{block}</SyntaxHighlighter>: 
                <Typography sx = {{fontSize: '20px', }}>{block}</Typography>))}
            </Box>
            </Box>
        </Box> 
    }

export default ChatItems