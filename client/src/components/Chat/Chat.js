import React, { useState, useEffect } from 'react';
import { Row, Col, message as antMessage } from 'antd';
import ChatHeader from '../ChatHeader/ChatHeader';
import Messages from '../Messages/Messages';
import ChatInput from '../ChatInput/ChatInput';
import UsersList from '../UsersList/UsersList';
import io from 'socket.io-client';
import './Chat.css';

let socket;

export default function Chat(props) {

    let [displayName] = useState(props.location.state.name);
    let [name] = useState(props.location.state.name.trim().replace(/ /g, '').toLowerCase());
    let [displayRoom] = useState(props.location.state.room);
    let [room] = useState(props.location.state.room.trim().replace(/ /g, '').toLowerCase());
    let [users, setUsers] = useState([]);
    let [message, setMessage] = useState('');
    let [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://sling-chat.herokuapp.com/';

    useEffect(() => {
        socket = io.connect(ENDPOINT);
        socket.emit('join', {name, room, displayName}, (data) => {
            console.log(data);
            if(data && data.error) {
                return antMessage.error(data?.error);
            }
        });
        
        //Unmounting
        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    }, [ENDPOINT, name, room]);

    //For receiving messages
    useEffect(() => {
        socket.on("message", (message) => {
            setMessages(messages => [...messages, message]);
        });
        socket.on("roomData", (data) => {
            if(room === data.room) {
                setUsers(data.users);
            }
        });
    }, []);

    //Functions for sending messages
    function sendMessage(event) {
        event.preventDefault();
        if(message) {
            socket.emit("sendMessage", message, () => setMessage(''));
        }
    }

    return (
        <div>
            <Row>
                <Col className="chat-cont" span={24}>
                    <ChatHeader room={displayRoom} users={users} />
                    <Row>
                        <Col className="chat-window" xs={24} sm={{span: 22, offset: 1}} md={{span:18, offset:2}} lg={{span:14, offset: 1}} xl={{span: 14, offset: 1}}>
                            <Messages messages={messages} name={name} />
                            <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
                        </Col>
                        <Col className="online-users" md={{span:4, offset:1}} lg={{span:6, offset: 1}} xl={{span: 6, offset: 1}}>
                            <UsersList users={users} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
