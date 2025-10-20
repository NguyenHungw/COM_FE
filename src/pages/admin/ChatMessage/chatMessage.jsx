import { useEffect, useRef, useState } from 'react'
import './chatMessage.scss'
import { getAllMessage, getAllMessageRoom, sendMessGR } from '../../../services/api.service'
import * as signalR from "@microsoft/signalr";
import { useSelector } from 'react-redux';
import { notification } from 'antd';


const ChatMessage = () => {
       
    const [message,setMessage] = useState(null)
    const [messageUser,setMessageUser] = useState([])
    const [messInput,setMessInput] = useState("")
    const [currentRoom,setCurrentRoom] = useState(null)
    const [send,setSend] = useState(false)
    const [hasMore,setHasMore] = [false]
      const connectionRef = useRef(null); //  giữ connection an toàn qua các render
  const bottomRef = useRef(null);

    const user = messageUser?.find(item => !item.isFromAdmin);
 const rawRole = useSelector(state => state.account);
 console.log('check rawrole',rawRole)
const chatContainerRef = useRef(null);
let page = 1;


      
 useEffect(() => {
  const container = chatContainerRef.current;
  if (!container) return;

  const handleScroll = async () => {
    if (container.scrollTop === 0) { // người dùng cuộn lên đầu
         const oldScrollHeight = container.scrollHeight; // tổng chiều cao trước khi thêm
    const oldScrollTop = container.scrollTop;
      page = page + 1;
      const res = await getAllMessageRoom(`page=${page}&size=20&RoomID=${currentRoom}`);
      if (res && res.status === 1 && res.data.length > 0) {
        // chèn tin nhắn cũ vào đầu danh sách
        setMessageUser((prev) => [...res.data.reverse(), ...prev]);
        setTimeout(() => {
          const newScrollHeight = container.scrollHeight;
          // giữ nguyên vị trí hiển thị cũ (trừ đi phần mới thêm)
          container.scrollTop = newScrollHeight - oldScrollHeight + oldScrollTop - 10; 
          // trừ thêm 10px để tạo khoảng hở
        }, 0);
      
      }
    }
  };

  container.addEventListener('scroll', handleScroll);
  return () => container.removeEventListener('scroll', handleScroll);
}, [currentRoom]);
 useEffect(() => {
    if(send){
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setSend(false)
    }
  }, [send]);
  
      const handleSend = async()=>{
        console.log("Tin nhắn gửi:", messInput);
         const res = await sendMessGR(currentRoom,rawRole.user.id,messInput,)
         console.log('check mess gửi',res)
         if(res&&res?.status===1){
            notification.success({message:"gửi thành công"})
            console.log('thành công')
         }
        setMessInput("");
        setSend(true)

      }
    const getMess = async() =>{
        let query = `page=1&size=20`
        const res = await getAllMessage(query)
        console.log('check res',res)
            if(res&&res.status===1){
                setMessage(res.data)
                console.log('check mess',message)
            }
        
    }
const joinRoom = async(roomID) => {
    setSend(true)
    page=1
    setCurrentRoom(roomID)
    const connection = connectionRef.current
    if (!connection) {
    console.warn("Connection chưa khởi tạo");
       console.log("check roomID:", roomID);
  console.log("connection state:", connection.state);
    return;
  }
   if (connection.state !== signalR.HubConnectionState.Connected) {
    console.warn("⏳ Đang chờ kết nối lại...");
    try {
      await connection.start();
      console.log(" Reconnected trước khi JoinRoom");
    } catch (err) {
      console.error("Lỗi khi reconnect:", err.message);
      return;
    }
  }
  

      await connection.invoke("JoinRoom", roomID);
      console.log(`Đã vào phòng ${roomID}`);
      let query = `page=1&size=15&RoomID=${roomID}`
      const res = await getAllMessageRoom(query)
      if(res&&res?.status===1){
        setMessageUser(res.data.reverse())
      }
}

 
    useEffect(()=>{
        //taoj keet noi signal 
           const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:2222/chatHub")
      .withAutomaticReconnect()
      .build();
    connectionRef.current = connection
const StartSignal = async() => {
    
      try {
        await connection.start();
        console.log("Đã kết nối Hub (Admin)");

        // Tham gia group admins
        await connection.invoke("JoinAsAdmin");
        console.log(" Admin đã join group 'admins'");

      } catch (err) {
        console.error("Lỗi kết nối:", err);
        setTimeout(StartSignal, 3000);
      }
    }

StartSignal()
 connection.on("ReceiveMessage", (newMess) => {
      console.log("Có tin nhắn mới từ user:", newMess);
    //   setMessage((prev)=>(prev? [...prev,newMess]:[newMess]))
    setMessage((prev)=>{
        if(!prev || prev.length === 0 ) return [newMess]
        // tìm index tin nhắn trùng iD
        const index = prev.findIndex((mess)=> mess.roomID == newMess.roomID)
        if(index !== -1){
            //nếu đã tồn tại thì clone mảng cũ và ghi đè phần tử đso
            const updated = [...prev]
            updated[index] = newMess
            return updated
        }else{
            // nếu chưa có thêm lên trên đầu để cập nhật tin mới nhận
            return [newMess,...prev.filter(m => m.roomID !== newMess.roomID)];
        }
    })
     setMessageUser((prev)=>(prev? [...prev,newMess]:[newMess]))
    
 })
 


      //kết nối

       getMess()
         return () => {
      connection.stop();
    };
//       return () => {
//     connection.off("NewMessageAlert");
//   };
 
    },[])
    

    return (
       <div class="chat-container" >
  {/* <!-- Cột danh sách người dùng --> */}
  <div class="chat-sidebar">
    <div class="user-item">
  
 {message && message.length > 0 ? (
          console.log('check mess',message),

  message.map((mess,index) => (
    <div className="user-info" key={mess.index} onClick={()=>joinRoom(mess.roomID)}>
      <div className="user-name">{mess.fullName}</div>
      <div className="last-message">{mess.message}</div>
      <div className="time-message">{mess.sentAt}</div>
      <div className='seen'>{mess.isSeenByAdmin} </div>
    </div>
  ))
) : null}
        
    </div>
    {/* <div class="user-item">
       <img src="https://via.placeholder.com/40" alt="Avatar" />
      <div class="user-info">
        <div class="user-name">Admin</div>
        <div class="last-message">Hỗ trợ bạn nè!</div>
      </div>
    </div> */}
  </div>

  {/* <!-- Khung chat chính --> */}
  <div class="chat-main">

{
console.log(user?.fullName)
}
    <div class="chat-header">{user?.fullName}</div>
      <div class="chat-body" ref={chatContainerRef}>
  {messageUser && messageUser.length >0 ? (
    //console.log('check mess messageUser',messageUser),
  messageUser.map((item)=>(
    <>
         <div key={item.id} className={`message ${item.isFromAdmin ? 'right' : 'left'}`}>
      {item.message}
    </div>

      {/* <div class="message left">{item.message}</div> */}
       {/* <div class="message right">Chào !</div> */}
    </>

  ))
  
   ):null}
  {send ? <div ref={bottomRef} /> : null}
    
   </div>
    <div class="chat-footer">
      <input 
      type="text" 
      placeholder="Nhập tin nhắn..."
      value={messInput}
      onKeyDown={e=> e.key === 'Enter' && handleSend()}
      onChange={(e)=>setMessInput(e.target.value)}
       />
      <button onClick={handleSend}>Gửi</button>
    </div>
  </div>
</div>
    )
}

export default ChatMessage