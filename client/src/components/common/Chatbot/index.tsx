import { useState } from "react";
import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

import { sendMessageToChatbot } from "@api/chatbot";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; text: string }[]
  >([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    try {
      const res = await sendMessageToChatbot(userText);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Server error. Please try again later.",
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 2000,
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Window */}
      {open && (
        <Paper
          elevation={5}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: { xs: "85%", sm: 320 },
            height: 450,
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            overflow: "hidden",
            zIndex: 2100,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              height: 56,
              bgcolor: "primary.main",
              color: "white",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>
              AI Assistant
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              size="small"
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              bgcolor: "#f9f9f9",
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  mb: 1.5,
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    px: 1.5,
                    py: 1,
                    maxWidth: "75%",
                    bgcolor:
                      msg.sender === "user"
                        ? "primary.main"
                        : "grey.200",
                    color:
                      msg.sender === "user" ? "white" : "black",
                    borderRadius: "12px",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  {msg.text}
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              borderTop: "1px solid #eee",
            }}
          >
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  background: "white",
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              sx={{ ml: 1 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Chatbot;
