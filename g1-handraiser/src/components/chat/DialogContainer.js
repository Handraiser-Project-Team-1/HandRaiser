import React, { useEffect, useRef } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import ChatMessages from "./components/Component";

const muiBaseTheme = createMuiTheme();

const AVATAR =
  "https://i.pinimg.com/originals/0a/dd/87/0add874e1ea0676c4365b2dd7ddd32e3.jpg";

const DialogContainer = () => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };
  useEffect(scrollToBottom, []);
  return (
    <ThemeProvider theme={muiBaseTheme}>
      <ChatMessages avatar={AVATAR} messages={["Hi Jenny, How r u today?"]} />
      <ChatMessages side={"right"} messages={["Great! What's about you?"]} />
      <ChatMessages avatar={AVATAR} messages={["Im good.", "See u later."]} />
      <ChatMessages
        side={"right"}
        messages={[
          "Great! What's about you?",
          "Of course I did. Speaking of which check this out"
        ]}
      />
      <ChatMessages
        side={"right"}
        messages={[
          "Great! What's about you?",
          "Of course I did. Speaking of which check this out"
        ]}
      />
      <ChatMessages avatar={AVATAR} messages={["Im good.", "See u later."]} />
      <ChatMessages
        side={"right"}
        messages={[
          "Great! What's about you?",
          "Of course I did. Speaking of which check this out"
        ]}
      />
      <ChatMessages avatar={AVATAR} messages={["Im good.", "See u later."]} />
      <ChatMessages
        side={"right"}
        messages={[
          "Great! What's about you?",
          "Of course I did. Speaking of which check this out"
        ]}
      />

      <div ref={messagesEndRef} />
    </ThemeProvider>
  );
};

export default DialogContainer;
