import React from 'react';

export class EditMenu extends React.Component {

    componentWillMount() {
    }

    componentWillReceiveProps() {
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h1>ویرایش مشخصات منو</h1>
                <div>
                    {this.props.menu}
                </div>
            </div>
        )
    }
}