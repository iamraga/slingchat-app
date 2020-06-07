import React from 'react';
import Message from '../Message/Message';
import './Messages.css';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Messages({ messages, name }) {
    return (
        <ScrollToBottom className="messages-cont">
        {
            messages.map((each, index) => (
                <div key={index}><Message name={each.user} displayName={each.displayName} currentUser={name} text={each.text} /></div>
            ))
        }
        </ScrollToBottom>
    )
}
