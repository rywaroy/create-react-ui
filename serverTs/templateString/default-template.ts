export default function defaultTemplate(variable: string): string {
    return `import React, { Component } from 'react';

class ${variable} extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>${variable}</div>
        );
    }
}

export default ${variable};
`;
}
