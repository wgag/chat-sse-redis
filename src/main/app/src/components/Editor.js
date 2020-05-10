import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
    editor: {
        padding: '16px',
    },
    userTextBox: {
        width: '100%',
        margin: '8px 0px',
    },
    textTextBox: {
        width: '100%',
        margin: '8px 0px',
    },
    sendButton: {
        margin: '8px 0 8px auto',
        display: 'block',
        width: 'fit-content',
        backgroundColor: '#3399ff',
        color: '#fafafa',
    },
};

export default class Editor extends React.Component {
    render() {
        return (
            <div style={styles.editor}>
                <div>
                    <TextField name="user" placeholder="Name" onChange={this.props.onChange} style={styles.userTextBox} />
                </div>
                <div>
                    <TextField name="text" placeholder="Message" multiline onChange={this.props.onChange} onKeyPress={this.props.onKeyPress} style={styles.textTextBox} />
                </div>
                <div>
                    <Button color="primary" onClick={this.props.onClick} style={styles.sendButton}>Send</Button>
                </div>
            </div>
        );
    }
}
