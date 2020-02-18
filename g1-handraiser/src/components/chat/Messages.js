import React from 'react'
import ChatMessages from "./components/Component";


function Messages({ message: { fname, message }, name, image }) {
    const AVATAR =
    `${image}`;
    let isSentByCurrentUSer = false;
     const trimmedfname = fname.trim().toLowerCase();
     const trimmedName = name.trim().toLowerCase();

    if (trimmedfname === trimmedName) {
        isSentByCurrentUSer = true; 
    }
    return (
        isSentByCurrentUSer ? (
            <ChatMessages
                side={"right"}
                messages={[`${message}`]}
            />
        ) : (
                <ChatMessages avatar={AVATAR} messages={[`${message}`]} />
            )
    )
}

export default Messages
