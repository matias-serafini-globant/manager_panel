import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userGet, getUserForId, deleteUserForId, resetStore } from '../../Actions/LoginAction'
function mapStateToProps(state) {
    return {
        allUsers: state.allUsers
    };
}

class UserComponent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        userGet();
        console.log(this.props.allUsers, "DESDE FUERA DE RENDER")
    }

    render() {
        { console.log(this.props.allUsers, "DESDE RENDER") }
        return (
            <div>

            </div>
        );
    }

}

export default connect(
    mapStateToProps, { userGet, getUserForId, deleteUserForId, resetStore }
)(UserComponent);