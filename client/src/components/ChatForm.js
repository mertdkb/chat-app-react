import { React, useState } from 'react'

import styles from './styles.module.css'
import {sendMessage} from '../socketApi'
import {useChat} from '../context/ChatContext'

function ChatForm() {
  const [message, setMessage] = useState({
    message: "",
    date: Date.now(),
    fromMe: true
  });

  const {setMessages} = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(message.message === "" || message.message === undefined){
      return;
    }
    setMessages((prevState) => [...prevState, {...message}]);
    sendMessage(message)
    setMessage({message: ""});
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.textInput}
          value={message.message}
          onChange={(e) => setMessage({message: e.target.value, date: Date.now(), fromMe: true})} />
      </form>
    </div>
  )
}

export default ChatForm