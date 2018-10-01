import React from 'react';

export class EditQuestion extends React.Component {

    componentWillMount() {
    }

    componentWillReceiveProps() {
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h1>ویرایش مشخصات سوال</h1>
                <div>
                    {this.props.menu}
                </div>
            </div>
        )
    }
}