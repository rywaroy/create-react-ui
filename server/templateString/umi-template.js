module.exports = function umiTemplate(variable, namespace) {
    return `import React, { Component } from 'react';
import { connect } from 'dva';

class ${variable} extends Component {

    render() {
        return (
            <div>${variable}</div>
        );
    }
}

export default connect(({ ${namespace} }) => ({ ${namespace} }))(${variable});`;
};