import React from 'react'

import styles from "./styles.module.css"
import { useChat } from "../context/ChatContext"
import ScrollableFeed from 'react-scrollable-feed'

import ChatItem from './ChatItem';



function ChatList() {
  const { messages } = useChat();
  console.log("CHATLIST : ", messages);
  return (
    <div className={styles.chatlist}>
      <ScrollableFeed forceScroll={true}>
        {
          messages.map((item, key) => (
            <ChatItem key={key} item={item} />
          ))
        }
      </ScrollableFeed>
    </div>
  )
}

export default ChatList