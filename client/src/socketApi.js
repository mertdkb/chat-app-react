import io from 'socket.io-client'

let socket;

export const init = () => {
    console.log("Connecting...");

    socket = io("http://localhost:3000", {
        transports: ["websocket"],

    });
    socket.on('connect', () => console.log("Connected"))
};

export const sendMessage = (message) => {
    if(socket){
        socket.emit("new-message", JSON.stringify(message))
    }
};

export const subscribeChat = (cb) => {
    if(!socket){
        return;
    }

    socket.on("receive-message", (message) => {
        let msg = JSON.parse(message);
        if(msg.fromMe){
            return;
        }
        console.log("new message arrived CLIENT : ", msg)
        cb(JSON.parse(message));
    });
};

export const subscribeInitialMessages = (cb) => {
    if(!socket){
        return;
    }

    socket.on("message-list", (messages) => {
        console.log("INITIAL ",{messages})
        console.log("Initial messages : ", JSON.parse(messages))
        cb(JSON.parse(messages));
    });
}