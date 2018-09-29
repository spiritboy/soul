import React from 'react';

export class EditMenu extends React.Component {

    componentWillMount() {
    }
    componentWillReceiveProps(){
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                {this.props.menu}
            </div>
        )
    }
}