import React from 'react';

export interface CreateProps {

}

export interface CreateState {

}

class Create extends React.Component<CreateProps, CreateState> {
    constructor(props: CreateProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>create</div>
        );
    }
}

export default Create;
