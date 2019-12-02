module.exports = function defaultTemplate(variable) {
    return `import React, { Component } from 'react';

class ${variable} extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>About</div>
        );
    }
}

export default ${variable};
`;
};