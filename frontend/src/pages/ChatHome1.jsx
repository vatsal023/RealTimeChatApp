// ChatHomeMock.jsx
import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

// ---- MOCK SOCKET ----
class FakeSocket {
  constructor() {
    this.listeners = {};
  }
  addEventListener(event, cb) {
    this.listeners[event] = cb;
  }
  removeEventListener(event) {
    delete this.listeners[event];
  }
  send(data) {
    console.log("FAKE send:", data);
    // Simulate echo response
    setTimeout(() => {
      this.listeners["message"]?.({
        data: JSON.stringify({
          text: "Echo: " + JSON.parse(data).text,
          sender: "2",
          recipient: "1",
        }),
      });
    }, 500);
  }
}

// ---- MOCK AXIOS ----
const mockAxios = {
  get: async (url) => {
    if (url.startsWith("/api/user/messages/")) {
      return {
        data: [
          { text: "Mock previous message", sender: "2", recipient: "1" },
        ],
      };
    }
    if (url === "/api/user/people") {
      return {
        data: [
          { _id: "1", firstName: "Alice", lastName: "Smith", username: "Alice", avatarLink: "alice.png" },
          { _id: "2", firstName: "Bob", lastName: "Johnson", username: "Bob", avatarLink: "bob.png" },
        ],
      };
    }
  },
};

const mockUser = { _id: "1", username: "Alice" };

const ChatHomeMock = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("2"); // auto-select Bob
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

 const { userDetails } = useProfile()||{ userDetails: { _id: "1", username: "Alice" } };
  // const userDetails = mockUser
  const { isAuthenticated, checkAuth } = useAuth() || { isAuthenticated: true, checkAuth: () => {} };
  const navigate = useNavigate();

  // Connect to FakeSocket
  useEffect(() => {
    const fakeWs = new FakeSocket();
    setWs(fakeWs);

    const handleRealTimeMessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prev) => [...prev, { ...messageData }]);
    };

    fakeWs.addEventListener("message", handleRealTimeMessage);

    return () => {
      fakeWs.removeEventListener("message", handleRealTimeMessage);
    };
  }, []);

  // Mock fetch messages
  useEffect(() => {
    const fetchData = async () => {
      if (selectedUserId) {
        const res = await mockAxios.get(`/api/user/messages/${selectedUserId}`);
        setMessages(res.data);
      }
    };
    fetchData();
  }, [selectedUserId]);

  // Mock people with firstName/lastName for TopBar
  useEffect(() => {
    mockAxios.get("/api/user/people").then((res) => {

      console.log(res);
      console.log(res.data);
      console.log(userDetails);

      const offlinePeopleArr = res.data.filter((p) => p._id !== userDetails._id);

      console.log(offlinePeopleArr)
      setOfflinePeople(
        offlinePeopleArr.reduce((acc, p) => {
          acc[p._id] = p; // now each person has firstName, lastName, username
          return acc;
        }, {})
      );


      // Online people (all except current user)
      const onlinePeopleArr = res.data.filter((p) => p._id !== userDetails._id);
      setOnlinePeople(
        onlinePeopleArr.reduce((acc, p) => {
          acc[p._id] = p; // include firstName/username
          return acc;
        }, {})
      );

      console.log(onlinePeopleArr)
    });
  }, [userDetails]);

  const sendMessage = (ev) => {
    if (ev) ev.preventDefault();
    ws.send(JSON.stringify({ text: newMessage, recipient: selectedUserId }));
    console.log(userDetails._id)
    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: userDetails._id,
        recipient: selectedUserId,
        _id: Date.now(),
      },
    ]);
    setNewMessage("");
  };

  // Auth mock
//   useEffect(() => {
//     checkAuth();
//     if (!isAuthenticated) navigate("/");
//   }, []);

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
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />
        <div className="absolute w-full bottom-0 flex justify-center items-center">
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

export default ChatHomeMock;
