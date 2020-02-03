import React from "react";
import io from "socket.io-client";

var socket = io.connect("http://localhost:3001/");

export default function page404() {
  return (
    <React.Fragment>
      <h1
        style={{ textAlign: "center", fontSize: "5rem", paddingTop: "200px" }}
      >
        404{" "}
        <span style={{ textAlign: "center", fontSize: "20px" }}>
          Page not found!
        </span>
      </h1>
    </React.Fragment>
  );
}
