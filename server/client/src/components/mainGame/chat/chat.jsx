import React ,{ useEffect, useState }from "react";
import style from "./chat.module.css"
import moment from "moment"
import {IconButton,Drawer,Divider,Typography} from '@mui/material/';
import {ChevronRight,ChevronLeft,Send,ChatBubbleOutlineOutlined} from '@mui/icons-material/';
// import ChevronLeft from '@mui/icons-material/ChevronLeft';


function Chat(props){
  const {user,session,socket} = props
  const drawerWidth = 240
  const [open,setOpen]=useState(false)
  const [message,setMessage]=useState("")
  const [messagesArray,setMessagesArray]=useState([])
  const [seenMsgList,setSeenMsgList]=useState([])
  const [messagesCount,setMessagesCount]=useState(0)

  useEffect(() => {
    initSocketHandler()
  },[])

  useEffect(() => {
    if(!open)
      setMessagesCount(messagesArray.filter(i => !seenMsgList.includes(i.msg_id)).length)
  },[messagesArray])

  useEffect(() => {
    if(!session?.id)return
    socket.emit("session", { type:"getChat",  sessionId: session.id });
  },[session])

  const initSocketHandler = () => {
    socket.on("session", (data) => {
      if(data.type === "chatList"){
        setMessagesArray(data.msg)
      }
    })
  };

  const handleDrawerOpen = () => {
    setSeenMsgList(messagesArray.map(i => i.msg_id))
    setMessagesCount(0)
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
        <div className={style.chatBubbleCon}>
          {messagesCount > 0 ? <div className={style.notyNumStyle}>{messagesCount}</div> : null}
          <ChatBubbleOutlineOutlined />
        </div>
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
            if(chat.playerName)console.log(chat.playerName);
          return (
            <div className={msgStyle} key={`${chat.msg_id}`}>
              <div>
                <span  className={style.nameTag}>{chat.player_id===user.id ?"me":chat.userName}</span>
                  {chat.winner && (
                  <div className={style.winCon}>
                    <p>the winner: {chat.winner}</p>
                    </div>)}
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