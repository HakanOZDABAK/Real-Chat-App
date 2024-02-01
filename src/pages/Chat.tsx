import { Button, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "../configs/firebaseConfig";
import { useRoomService } from "../store/useRoomService";

export default function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const { room } = useRoomService();
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: any = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newMessage == "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room,
    });

    setNewMessage("");
  };
  const currentUser = auth.currentUser?.displayName;

  return (
    <div className="chat-app">
      <div
        style={{
          paddingBottom: "80px",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            backgroundColor: "greenyellow",
            margin: 0,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Room: {room}
        </h1>
        <div className="messages">
          {messages.map((message) => {
            const isCurrentUser = message.user === currentUser;
            const userStyle = {
              fontWeight: isCurrentUser ? "bold" : "normal",
              color: isCurrentUser ? "green" : "blue",
            };

            return (
              <div
                className="message"
                key={message.id}
                style={{
                  textAlign: isCurrentUser ? "right" : "left",
                  margin: "10px",
                  padding: "10px",
                  backgroundColor: isCurrentUser ? "#DCF8C6" : "#E8E8E8",
                  borderRadius: "8px",
                }}
              >
                {isCurrentUser ? "" : (
                  <span className="user" style={userStyle}>
                    {message.user}:
                  </span>
                )}
                {message.text}
              </div>
            );
          })}
        </div>

        <form
          className="new-message-form"
          onSubmit={handleSubmit}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    variant="contained"
                    className="send-button"
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>
    </div>
  );
}
