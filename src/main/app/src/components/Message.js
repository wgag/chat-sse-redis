// see also https://qiita.com/classfox/items/c27be0162076dd4bf539

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import avatar from '../avatar.png';

const styles = {
    listItem: {
        display: 'grid',
        gridTemplateColumns: '50px auto 1fr',
        verticalAlign: 'middle',
        alignItems: 'center',
        justifyItems: 'start',
        padding: '8px 16px',
    },
    avatar: {
        display: 'block',
    },
    user: {
        display: 'block',
        height: '1em',
    },
    text: {
        display: 'block',
        backgroundColor: '#bbddff',
        borderRadius: '16px',
        width: 'fit-content',
        margin: '10px',
        padding: '10px',
    },
};

export default class Message extends React.Component {
    render() {
        return (
            <div style={styles.message}>
                <List>
                    <ListItem style={styles.listItem}>
                        <div style={styles.avatar}>
                            <Avatar src={avatar} />
                        </div>
                        <div style={styles.user}>
                            @{this.props.message.user}
                        </div>
                        <div style={styles.text}>
                            {this.props.message.text}
                        </div>
                    </ListItem>
                </List>
            </div>
        );
    }
}
