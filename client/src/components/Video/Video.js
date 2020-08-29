import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, message as antMessage } from 'antd';
import ChatHeader from '../ChatHeader/ChatHeader';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import './Video.css';

export default function Video(props) {

    let [displayName] = useState(props.location.state.name);
    let [name] = useState(props.location.state.name.trim().replace(/ /g, '').toLowerCase());
    let [displayRoom] = useState(props.location.state.room);
    let [room] = useState(props.location.state.room.trim().replace(/ /g, '').toLowerCase());
    let [roomType] = useState(props.location.state.roomType);
    let [users, setUsers] = useState([]);
    let [stream, setStream] = useState();

    let userVideo = useRef();
    let callerVideo = useRef();
    let socket = useRef();
    let client = {};

    const ENDPOINT = 'https://sling-chat.herokuapp.com/';
    useEffect(() => {
        socket.current = io.connect(ENDPOINT);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }

            socket.current.emit('newVideoUser', {name, room, displayName}, (data) => {
                if(data && data.error) {
                    return antMessage.error(data?.error);
                }
            });

            //Initialise a peer
            function initPeer(type) {
                let peer = new Peer({initiator: (type === "init") ? true : false, trickle: false, stream});
                peer.on("stream", stream => {
                    callerVideo.current.srcObject = stream;
                });
                peer.on("close", () => {
                    callerVideo.current.srcObject = null;
                    peer.destroy();
                });
                return peer;
            }

            //Create a peer with type init
            function makePeer() {
                client.gotAnswer = false;
                let peer = initPeer("init");
                peer.on('signal', data => {
                    if(!client.gotAnswer) {
                        socket.current.emit("offer", data);
                    }
                });
                client.peer = peer;
            }

            function frontAnswer(offer) {
                let peer = initPeer("not init");
                //Getting signal from another client
                peer.on("signal", data => { 
                    socket.current.emit("answer", data);
                });
                peer.signal(offer);
                client.peer = peer
            }
            
            //Handling answer that comes from our backend
            function signalAnswer(answer) {
                client.gotAnswer = true
                let peer = client.peer;
                peer.signal(answer);
            }

            function sessionActive() {
                alert("session ongoing");
            }

            socket.current.on("backOffer", frontAnswer); //When offer is coming from the backend, generate the answer from client
            socket.current.on("backAnswer", signalAnswer); //When we get the answer from the backend, send signal to connect both clients
            socket.current.on("sessionActive", sessionActive);
            socket.current.on("createPeer", makePeer);
            socket.current.on("videoUserJoined", (data) => {
                antMessage.success(data?.text);
            });
        });

        socket.current.on("roomData", (data) => {
            if(room === data.room) {
                setUsers(data.users);
            }
        });

        //Unmounting
        return () => {
            socket.current.emit("disconnect");
            socket.current.off();
        }
    }, []);

    return (
        <div>
            <Row>
                <Col className="chat-cont" span={24}>
                    <ChatHeader room={displayRoom} users={users} roomType={roomType} />
                    <Row className="video-grid-container">
                        <Col className="video-grid" span={24}>
                            <Row>
                                <Col className="video-grid-item" xs={24} sm={24} md={{span:10, offset:1}} lg={{span:10, offset: 1}} xl={{span: 10, offset: 1}}>
                                    <video playsInline muted ref={userVideo} autoPlay />
                                </Col>
                                <Col className="video-grid-item" xs={24} sm={24} md={{span:10, offset:2}} lg={{span:10, offset: 2}} xl={{span: 10, offset: 2}}>
                                    <video playsInline ref={callerVideo} autoPlay />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
