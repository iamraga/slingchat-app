import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import './ChatInput.css';

export default function ChatInput({ message, setMessage, sendMessage }) {
    return (
        <div>
            <Row className="input-bar">
                <Col xs={18} sm={18} md={20} lg={20} xl={20}>
                    <Input 
                        className="text-input"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyPress={(event) => (event.key === "Enter") ? sendMessage(event) : null}
                    />
                </Col>
                <Col style={{textAlign: 'center'}} xs={6} sm={6} md={4} lg={4} xl={4}>
                    <Button type="primary" className="send-message" onClick={(e) => sendMessage(e)}>Send</Button>
                </Col>
            </Row>
        </div>
    )
}
