import React,{useEffect,useState } from "react";
import axios from "axios";
import {useAuth} from "../context/authContext"
import {useNavigate} from "react-router-dom";

const ChatHome = ()=>{
    const [ws,setWs] = useState(null);
    const [messages,setMessages] = useState([]);
    const [selectedUserId,setSelectedUserId] = useState(null);
    const {isAuthenticated,checkAuth} = useAuth();
    const [newMessage,setNewMessage] = useState("");
    const navigate = useNavigate();
    
    const connecttoWebSocket = ()=>{
        const ws = new WebSocket(socketUrl);
        ws.addEventListener("message",handleMessage);
        setWs(ws);
    };

    useEffect(()=>{
        connecttoWebSocket();
        ws?.addEventListener("close",()=>{
            connecttoWebSocket();
        })
    },[userDetails,selectedUserId]);

    useEffect(()=>{
        const fetchData = async()=>{
            if(selectedUserId){
                try{
                    const res = await axios.get(`/api/user/messages/${selectedUserId}`);
                    setMessages(res.data)

                }catch(error){
                    console.error("Error fetching messages:",error);
                }
            }
        }
        fetchData();
    },[selectedUserId]);

    useEffect(()=>{
        const handleRealTimeMessage = (event)=>{
            const messageData = JSON.parse(event.data);

            if("text" in messageData){
                setMessages((prev)=>[...prev,{...messageData}]);
            }
        }
         // Add event listener for real-time messages
            if(ws){
                ws.addEventListener("message",handleRealTimeMessage);
            }

            return ()=>{
                 // Remove the event listener when component unmounts
                if(ws){
                    ws.removeEventListener("message",handleRealTimeMessage);
                }
            };
    },[ws,selectedUserId]);

    

    const sendMessage = (ev) =>{
        if(ev) {
            ev.preventDefault();
        }
        console.log("sending message");
        console.log(newMessage,selectedUserId);
        ws.send(JSON.stringify({
            text:newMessage,
            recipient:selectedUserId
        }))
        setNewMessage("")
        setMessages((prev)=>[
            ...prev,
            {
                text:newMessage,
                sender:userDetails._id,
                recipient:selectedUserId,
                _id:Date.now(),
            }
        ])
    }
    useEffect(()=>{
        checkAuth();
        if(!isAuthenticated){
            navigate("/");
        }
    },[])

 }