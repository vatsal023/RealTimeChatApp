import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";
import { socketUrl } from "../../apiconfig";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [messagesMap, setMessagesMap] = useState({}); // store messages per user
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const { isAuthenticated, checkAuth } = useAuth();
  const { userDetails } = useProfile();
  const navigate = useNavigate();

  // Connect to WebSocket
  const connecttoWebSocket = () => {
    const ws = new WebSocket(socketUrl);
    ws.addEventListener("message", handleMessage);
    setWs(ws);
  };

  useEffect(() => {
    connecttoWebSocket();

    ws?.addEventListener("close", () => {
      connecttoWebSocket();
    });
  }, [userDetails, selectedUserId]);

  // Fetch messages for the selected user and store in messagesMap
  useEffect(() => {
    const fetchData = async () => {
      if (selectedUserId) {
        try {
          const res = await axios.get(`/api/user/messages/${selectedUserId}`);
          setMessagesMap((prev) => ({
            ...prev,
            [selectedUserId]: res.data,
          }));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchData();
  }, [selectedUserId]);

  // Fetch offline users
  useEffect(() => {
    axios.get("/api/user/people").then((res) => {
      const offlinePeopleArr = res?.data
        .filter((p) => p._id !== userDetails?._id)
        .filter((p) => !onlinePeople[p._id]);

      setOfflinePeople(
        offlinePeopleArr.reduce((acc, p) => {
          acc[p._id] = p;
          return acc;
        }, {})
      );
    });
  }, [onlinePeople, userDetails]);

  // Handle WebSocket messages
  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      if (userId !== userDetails?._id) {
        people[userId] = { username };
      }
    });
    setOnlinePeople(people);
  };

  const handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data);

    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      const recipientId =
        messageData.sender === userDetails._id
          ? messageData.recipient
          : messageData.sender;

      // Update messagesMap for the correct user
      setMessagesMap((prev) => ({
        ...prev,
        [recipientId]: [...(prev[recipientId] || []), messageData],
      }));
    }
  };

  const sendMessage = (ev) => {
    if (ev) ev.preventDefault();
    if (!newMessage || !selectedUserId) return;

    const msgObj = {
      text: newMessage,
      sender: userDetails._id,
      recipient: selectedUserId,
      _id: Date.now(),
    };

    ws.send(
      JSON.stringify({
        text: newMessage,
        recipient: selectedUserId,
      })
    );

    // Add the message to the correct user's array
    setMessagesMap((prev) => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), msgObj],
    }));

    setNewMessage("");
  };

  // Auth check
  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />
      <section className="w-[71%] lg:w-[62%] relative pb-10">
        {selectedUserId && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
          />
        )}

        <ChatMessages
          messages={messagesMap[selectedUserId] || []} // show messages for selected user
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />

        <div className="w-full absolute bottom-0 flex justify-center items-center">
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
          />
        </div>
      </section>
    </div>
  );
};

export default ChatHome;
