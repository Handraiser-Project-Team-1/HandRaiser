import React, { useEffect, useRef } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Messages from './Messages';
const muiBaseTheme = createMuiTheme();

const DialogContainer = ({ open, state, messages, name }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  
 
  useEffect(scrollToBottom, [open, state]);
  return (
    <ThemeProvider theme={muiBaseTheme}>
      {messages.map((message, i) => <div key={i}><Messages message={message} name={name}/></div>)}
      <div ref={messagesEndRef} />
    </ThemeProvider>
  );
};

export default DialogContainer;
