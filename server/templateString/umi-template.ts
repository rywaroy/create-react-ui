export default function umiTemplate(variable: string, namespace: string) {
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
}
