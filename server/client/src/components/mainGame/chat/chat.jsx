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
  const [messagesArray,setMessagesArray]=useState([
    {name:"dave",id: user.id,text:"asds",time:1664418112},
    {name:"bonny",id: 123456,text:"xcvfdgsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssxcvxcv",time:1664417032}])

  socket.on("session", (data) => {
    if(data.type === "chatList")
      setMessagesArray(data.msg)
  })

  useEffect(() => {
    socket.emit("session", { type:"getChat" ,msg: "" });
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSendMessage = () => {
    console.log(message);
    socket.emit("session", { type:"chat" ,msg: message });
    setMessage("")
  };
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
          {messagesArray.map((msg) => {
            const msgStyle = [style.msg,msg.id===user.id ?style.self :style.players].join(" ")
          return (
            <div className={msgStyle}>
              <div>
                <span  className={style.nameTag}>bax banny</span>
                <Typography paragraph>
                  {msg.text}
                </Typography>
                <span>{moment.unix(msg.time).format("HH:mm")}</span>
              </div>
            </div>
          )
          })}
        </div>
      <div className={style.textCon} >
        <input className={style.textField} value={message} onChange={(e) =>setMessage(e.target.value)}/>
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