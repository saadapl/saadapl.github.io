import { useEffect } from "react";
import { io } from "socket.io-client";
import { atom, useAtom } from "jotai";

export const socket = io("http://17.76.57.76:3000")
export const charactersAtom = atom([]);


export const SocketManager = () => {
    const [_characters, setCharacters] = useAtom(charactersAtom);
    useEffect(() => {
        function onConnect() {
            console.log("Connected to server");
        }
        function onDisconnect() {
            console.log("Disconnected from server");
        }

        function onHello() {
            console.log("hello");
        }

        function onCharacters(value) {
            setCharacters(value);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("hello", onHello);
        socket.on("characters", onCharacters);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("hello", onHello);
            socket.off("characters", onCharacters);
        };
    }, []);
};
