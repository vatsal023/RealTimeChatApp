let baseUrl;
let socketUrl;

if(import.meta.env.VITE_NODE_ENV==="production"){
    baseUrl = "your-deployed-URL";
    socketUrl = "wss://your-deployed-url";
}else{
    baseUrl = "http://localhost:8001"
    socketUrl = "ws://localhost:8001";
}

export {baseUrl,socketUrl};

