import React, { useEffect, useRef, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import './ChatBubble.scss'; // bạn sẽ thêm style riêng
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';
import { notification } from 'antd';
import { createRoom, getAllMessageRoom, sendMessGR } from '../../services/api.service';
import { useSelector } from 'react-redux';
import { use } from 'react';

const ChatBubble = () => {
    const [connection ,setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [user,setUser] = useState("khách")
    const [message, setMessage] = useState("");
    const [inputMessage,setInputMessage] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [currentRoom,setCurrentRoom] = useState(null)
     const rawRole = useSelector(state => state.account);
       const bottomRef = useRef(null);

           const connectionRef = useRef(null); //  giữ connection an toàn qua các render
     
    console.log('rawRole',rawRole)
 useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
    const CreateRoom = async(id) => {
      const res = await createRoom(id)
      if(res&&res?.status===1){
        notification.success({message:'Taoj room thanh cong'})
        setIsOpen(true)
        setCurrentRoom(res.data)
        
      }
    }
    const JoinRoom = async(currentRoom) =>{
          const connection = connectionRef.current
          console.log('check current room',currentRoom)
          if (!connection) {
          console.warn("⚠️ Connection chưa khởi tạo");
             console.log("check roomID:", currentRoom);
        console.log("connection state:", connection.state);
          return;
        }
         if (connection.state !== signalR.HubConnectionState.Connected) {
          console.warn("⏳ Đang chờ kết nối lại...");
          try {
            await connection.start();
            console.log("Reconnected trước khi JoinRoom");
          } catch (err) {
            console.error("Lỗi khi reconnect:", err.message);
            return;
          }
        }
      await connection.invoke("JoinRoom", currentRoom);
      console.log(`Đã vào phòng ${currentRoom}`);
      let query = `page=1&size=10&RoomID=${currentRoom}`
      const res = await getAllMessageRoom(query)
      if(res&&res?.status===1){
        setMessages(res.data.reverse())
      }
    }

    useEffect(()=>{
      if(isOpen){
        JoinRoom(currentRoom)
      }

    },[isOpen])
      useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:2222/chathub") // URL backend
      .withAutomaticReconnect()
      .build();
        connectionRef.current = connect

    connect.start()
      .then(() => console.log("Connected to SignalR"))
      .catch(err => console.error("Connection failed:", err));

    connect.on("ReceiveMessage", (message) => {
      setMessages(prev => [...prev,  message ]);
    });

    setConnection(connect);

    return () => connect.stop();
  }, []);

  useEffect(()=>{
    if(messages!==null)
      console.log('check mess',messages)
  },[messages])

  const sendMessage = async () => {
    // if (connection && message.trim()) {
    //   await connection.invoke("SendMessage", user, message);
    //   setMessage("");
    // }
    const res = await sendMessGR(currentRoom,rawRole.user.id,inputMessage)
    if(res&&res?.status===1){
      notification.success({message:'gửi tin nhắn thành công'})
    }
  };
    return (
        <>
            {/* bong bóng ở góc */}
            {/* {!isOpen && ( */}
                <div className='chat-bubble' onClick={()=> {
                  if(isOpen){
                    setIsOpen(false)
                    } else {
                      CreateRoom(rawRole.user.id)
                      }}} >
                    
                </div>
            {/* )} */}
             {/* Khung chat */}
             {isOpen && (
                <div className='chat-window'>
                <div className='chat-header'>
                     {/* <span> Chat Realtime </span> */}
                    <button style={{color:'black'}} onClick={()=> setIsOpen(false) } >X</button>
                </div>
                <div className='chat-messages'>
                    {/* {messages.map((m,i)=>(
                        <div key={i} className={m.user === user ? "me":"other"}>
                        <strong>{m.user}:</strong> {m.message}
                        </div>
                    ))} */}
                      {messages.map((item) => (
      <div key={item.id} className={`message ${item.isFromAdmin ? 'left' : 'right'}`}>
        {typeof item.message === 'object' ? item.message.message : item.message}
      </div>
    ))}
<div ref={bottomRef} />
                </div>
                <div className='chat-input'>
                    <input
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder='Nhập tin nhắn...'
                    onKeyDown={e=> e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>Gửi</button>
                </div>
                
                </div>
             )}
        </>
    )
}
export default ChatBubble