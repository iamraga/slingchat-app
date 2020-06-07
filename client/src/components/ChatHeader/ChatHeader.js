import React, { useState } from 'react';
import { Row, Col, Typography, Button, Modal } from 'antd';
import './ChatHeader.css';

const { Title } = Typography;

export default function ChatHeader({ room, users }) {

    let [showModal, setShowModal] = useState(false);

    return (
        <div>
            <Row>
                <Col style={{textAlign: 'center'}} span={24}>
                    <Title className="room-title">{room}</Title>
                    <Button className="view-users" onClick={(e) => setShowModal(true)}>{users.length} {(users.length > 1) ? 'users':'user'} online</Button>
                    <a href="/"><Button danger className="view-users">Leave room</Button></a>
                    <Modal
                        className="modal-users"
                        title="Users online"
                        centered
                        visible={showModal}
                        onOk={() => setShowModal(false)}
                        onCancel={() => setShowModal(false)}
                        footer={[
                            <div style={{textAlign: 'center'}}>
                                <Button type="primary" className="modal-okay" key="okay" onClick={() => setShowModal(false)}>
                                    Okay
                                </Button>
                            </div>
                        ]}
                        >
                        <div className="modal-content">
                        { 
                            users.map((user, index) => {
                                return (
                                    <p key={index} style={{margin: '5px 0px'}}>{user.displayName}</p>
                                )
                            })
                        }
                        </div>
                    </Modal>
                </Col>
            </Row>
        </div>
    )
}
