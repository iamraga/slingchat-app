import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

export default function Message({ name, currentUser, displayName, text}) {

    let yourMessage = (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div className="msg-cont your-msg-cont">
                <p className="user-title you"><b><i>You</i></b></p>
                <p className="text">{ReactEmoji.emojify(text)}</p>
            </div>
        </div>
    );
    let userMessage = (
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
            <div className="msg-cont user-msg-cont">
                <p className="user-title"><b><i>{displayName}</i></b></p>
                <p className="text">{ReactEmoji.emojify(text)}</p>
            </div>
        </div>
    );
    let adminMessage = (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="msg-cont admin-msg-cont">
                <p className="text admin-text">{text}</p>
            </div>
        </div>
    );
    return (
        <div>
            {(name === currentUser) ? (yourMessage) : (name === 'Admin') ? (adminMessage) : (userMessage)}
        </div>
    )
}
