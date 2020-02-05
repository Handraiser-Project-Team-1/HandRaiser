import React from 'react'
import ChatMessages from "./components/Component";
const AVATAR =
    "https://i.pinimg.com/originals/0a/dd/87/0add874e1ea0676c4365b2dd7ddd32e3.jpg";

function Messages({ message: { user, text }, name }) {
    let isSentByCurrentUSer = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUSer = true;
    }
    return (
        isSentByCurrentUSer ? (
            <ChatMessages
                side={"right"}
                messages={[`${text}`]}
            />
        ) : (
                <ChatMessages avatar={AVATAR} messages={[`${text}`]} />
            )
    )
}

export default Messages
