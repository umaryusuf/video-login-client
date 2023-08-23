import React, { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("https://video-logi-server.onrender.com");

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [call, setCall] = useState({});
    const [me, setMe] = useState("");
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState("");

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on("me", (id) => setMe(id));

        socket.on("callUser", ({ from, name: callerName, signal }) => {
            console.log("callingUser", from, callerName, signal);

            setCall({ isReceivedCall: true, from, name: callerName, signal });
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: call.from });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        console.log(id);
        const peer = new Peer({ initiator: true, trickle: false, stream });

        console.log(peer);

        peer.on("signal", (data) => {
            console.log("hi", data, me, socket);
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name,
            });
        });

        peer.on("stream", (currentStream) => {
            console.log("stream", currentStream);
            userVideo.current.srcObject = currentStream;
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider
            value={{
                call,
                callAccepted,
                callEnded,
                stream,
                myVideo,
                userVideo,
                name,
                me,
                isAdmin,
                setIsAdmin,
                setName,
                answerCall,
                callUser,
                leaveCall,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
