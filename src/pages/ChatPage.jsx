import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import "./chat.css";
const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

const ChatPage = () => {
  axios.defaults.withCredentials=true;
  const { email } = useParams();
  const [loading, setLoading] = useState(true);

  const provideremail = localStorage.getItem("provideremail", "****");
  const seekeremail = localStorage.getItem("seekeremail", "****");
  var tempemail = provideremail || seekeremail;

  const [messages, setMessages] = useState([]);
  const [newmessage, setnewMessage] = useState("");
  socket.on("connect", () => {});

  const addMessage = () => {
    socket.emit("send-message", {
      senderemail: tempemail,
      receiveremail: email,
      message: newmessage,
    });
    setnewMessage("");
  };

  useEffect(() => {
    socket.emit("loadHistory", {
      senderemail: tempemail,
      receiveremail: email,
    });

    socket.on("history", (arr) => {
      setMessages(arr);
      console.log(messages);
      setLoading(false);
    });
    console.log("1 use");
    return () => {
      socket.off("history");
    };
  }, []);
  useEffect(() => {
    socket.on(tempemail + email, (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(messages);
    });
    return () => {
      socket.off(tempemail + email);
    };
  }, []);
  return (
    <div>
      <h2 className=" text-[#21209C] text-center">You are Chatting with {email}</h2>
      {loading ? (
       <div className="flex justify-center h-full">   <div className="flex flex-col justify-center"><SpinnerDotted size={50} thickness={100} speed={98} color="rgba(33, 32, 156, 1)" className="items-center justify-center align-center h-full" /></div> </div>
      ) : (
        <div className="h-[70vh] overflow-y-scroll">
          {messages.map((item, index) => (
            <div id="index" className="container">
              {item.receiveremail === tempemail ? (
                <div className="message-blue">
                  <p className="message-content">{item.message}</p>
                  <div className="message-timestamp-left">
                    {item.senderemail}
                  </div>
                </div>
              ) : (
                <div className="message-orange">
                  <p className="message-content">{item.message}</p>
                  <div className="message-timestamp-right">
                    {item.senderemail}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="absolute top-[85vh] w-full">
        <input
          className="w-[90%] m-2 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 shadow-sm hover:shadow-md"
          type="text"
          placeholder="Enter your text"
          value={newmessage}
          onChange={(e) => setnewMessage(e.target.value)}
        />
        <button onClick={addMessage} className="bg-[#FDB827]  w-[100px] text-[#23120B] rounded-md p-1 shadow-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
