import React ,{ useEffect, useState }from "react";
import style from "./chat.module.css"
import moment from "moment"
import {IconButton,Drawer,Divider,Typography} from '@mui/material/';
import {ChevronRight,ChevronLeft,Send} from '@mui/icons-material/';
// import ChevronLeft from '@mui/icons-material/ChevronLeft';


function Chat(props){
  const {user,session,socket} = props
  const drawerWidth = 240
  const [open,setOpen]=useState(false)
  const [message,setMessage]=useState("")
  const [messagesArray,setMessagesArray]=useState([])

  socket.on("session", (data) => {
    if(data.type === "chatList"){
      setMessagesArray(data.msg)
    }
  })

  useEffect(() => {
    if(!session?.id)return
    socket.emit("session", { type:"getChat",  sessionId: session.id });
  },[session])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSendMessage = () => {
    socket.emit("session", {type:"chat" ,msg: message ,userId: user.id, sessionId: session.id });
    setMessage("")
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }
  return(
    <div >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{ ...(open && { display: 'none' }) }}
      >
        <ChevronLeft />
      </IconButton>
      <div className={style.chatCon}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 1,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
        >
      <div className={style.header}>
        <IconButton onClick={handleDrawerClose}>
        <ChevronRight />
        </IconButton>
      </div>
        <Divider />
        <div className={style.messageCon}>
          {messagesArray.map((chat) => {
            const msgStyle = [style.msg,chat.player_id===user.id ?style.self :style.players].join(" ")
          return (
            <div className={msgStyle} key={`${chat.msg_id}`}>
              <div>
                <span  className={style.nameTag}>{chat.player_id===user.id ?"me":chat.userName}</span>
                <Typography paragraph>
                  {chat.msg}
                </Typography>
                <span>{moment(chat.ts).format("HH:mm")}</span>
              </div>
            </div>
          )
          })}
        </div>
      <div className={style.textCon} >
        <input onKeyDown={handleKeyDown} className={style.textField} value={message} onChange={(e) =>setMessage(e.target.value)}/>
        <IconButton onClick={handleSendMessage}>
          <Send />
        </IconButton>
      </div>
      </Drawer>
      </div>
    </div>

  )
}
export default Chat