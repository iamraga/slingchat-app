import React from 'react';
import { Row, Col, Divider, Typography, Button } from 'antd';
import './UsersList.css';

const { Title } = Typography;

export default function UsersList({ users }) {
    return (
        <div>
            <Row justify="center">
                <Col className="users-list" span={22}>
                    <Title level={3}>Online users</Title>
                    <Divider style={{margin: '10px 0px', borderTop: '1px solid #0498ff'}} />
                    <div style={{overflow: 'auto'}}>
                        { 
                            users.map((user, index) => {
                                return (
                                    <div key={index} className="user">{user.displayName}</div>
                                )
                            })
                        }
                    </div>
                </Col>
                <Col className="leave-room" span={22}>
                    <a href="/"><Button danger className="leave-room-btn" type="primary">Leave room</Button></a>
                </Col>
            </Row>
        </div>
    )
}
