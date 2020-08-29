import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Video from './components/Video/Video';

const App = () => {
    return (
        <div>
            <Router>
                <Route path="/" exact component={Join} />
                <Route path="/chat" component={Chat} />
                <Route path="/video/:room" component={Video} />
            </Router>
        </div>
    )
}

export default App;