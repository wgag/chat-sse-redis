import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Editor from './Editor.js'
import Message from './Message.js'
import './../App.css';

export default class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            text: '',
            user: '',
            avatar: '',
            messages: []
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="MessageList">
                        {this.state.messages.map((m, i) => {
                            return <Message key={i} message={m} />
                        })}
                    </div>
                    <Editor onChange={this.handleChange} onClick={this.handleClick} onKeyPress={this.handleKeyPress} />
                </div>
            </MuiThemeProvider>
        );
    }

    handleChange(e) {
        if (e.target.name === 'user') {
            this.setState({
                'user': e.target.value
            });
            return;
        }
        if (e.target.name === 'text') {
            this.setState({
                'text': e.target.value
            });
            return;
        }
    }

    handleClick(e) {
        this.postMessage();
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.postMessage();
        }
    }

    componentDidMount() {
        const endpoint = '/api/timeline';
        const evtSource = new EventSource(endpoint);

        evtSource.onerror = event => {
            console.error('Error in accessing ' + endpoint);
            evtSource.close();
        };

        evtSource.onmessage = event => {
            console.log('Received ' + event.data);

            const { user, text } = JSON.parse(event.data);
            const messages = this.state.messages;

            messages.push({
                'user': user,
                'text': text,
            });

            this.setState({
                messages: messages
            });
        };
    }

    postMessage() {
        if (this.state.user === '') {
            alert('User name is empty.');
            return;
        }
        if (this.state.text === '') {
            alert('Message is empty.');
            return;
        }

        console.log('Posting ' + JSON.stringify({
            'user': this.state.user,
            'text': this.state.text,
        }));

        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'user': this.state.user,
                'text': this.state.text,
            })
        }).then(response => {
            console.log('Status: ' + response.status);
            return response.text();
        }).then(
            console.log
        ).catch(
            console.error
        );
    }
}
