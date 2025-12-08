let baseUrl;
let socketUrl;

if(import.meta.env.VITE_NODE_ENV==="production"){
    baseUrl = "https://realtimechatapp-28fn.onrender.com";
    socketUrl = "wss://realtimechatapp-28fn.onrender.com";
}else{
    baseUrl = "http://localhost:8001"
    socketUrl = "ws://localhost:8001";
}

export {baseUrl,socketUrl};

