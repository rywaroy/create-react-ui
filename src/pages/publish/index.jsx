import React, { Component } from 'react';
import { Terminal } from 'xterm';

class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.term = new Terminal();
        this.term.open(document.getElementById('terminal'));
        window.socket.on('term', msg => {
            this.term.write(msg);
        });
    }

    render() {
        return (
            <div>
                <div id="terminal" />
            </div>
        );
    }
}

export default Publish;
