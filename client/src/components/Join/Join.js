import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Join.css';
import { Row, Col, Button, Typography, Input, Radio } from 'antd';

const { Title } = Typography;

export default function Join() {

    let [name, setName] = useState("");
    let [room, setRoom] = useState("");
    let [roomType, setRoomType] = useState("chat");

    function radioOnChange(e) {
        setRoomType(e.target.value);
    }
    
    return (
        <Row justify="center" align="middle" className="sc-home-cont">
            <Col xs={20} sm={18} md={10} lg={6} xl={6}>
                <Row justify="center" className="join-inner-cont">
                    <Col span={16}>
                        <Title level={2} className="sc-title">SLINGCHAT</Title>
                    </Col>
                    <Col span={24} className="form-cont">
                        <Row justify="center">
                            <Col xs={20} sm={18} md={18} lg={18} xl={18}>
                                <Input size="large" className="input" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} />
                            </Col>
                            <Col xs={20} sm={18} md={18} lg={18} xl={18}>
                                <Input size="large" className="input" placeholder="Room name" onChange={(e) => setRoom(e.target.value)} value={room} />
                            </Col>
                            <Col xs={20} sm={18} md={18} lg={18} xl={18}>
                                <Radio.Group className="input" onChange={radioOnChange} defaultValue="chat">
                                    <Radio.Button value="chat">Text</Radio.Button>
                                    <Radio.Button value="video">Video</Radio.Button>
                                </Radio.Group>
                            </Col>
                            <Col xs={20} sm={18} md={18} lg={16} xl={16}>
                                <Link 
                                    onClick={(e) => (!room || !name) ? e.preventDefault() : null} 
                                    to={{
                                        pathname: `/${roomType == "chat" ? roomType : roomType + "/" + room}`,
                                        state: {
                                            name,
                                            room,
                                            roomType
                                        }
                                    }} >
                                    <Button type="primary" className="sc-submit">Enter Room</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
