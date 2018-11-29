import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userGet, getUserForId, deleteUserForId, resetStore } from '../../Actions/LoginAction'


class UserComponent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props.LoginReducer, "DESDE FUERA DE RENDER")
    }
    componentDidUpdate(prevProps, prevState) {
        this.props.userGet()
    }
    render() {
        {
            console.log(this.props.allUsers, "DESDE RENDER")
            console.log(this.props.authenticated, "AUT")
        }
        return (
            <div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        LoginReducer: state.LoginReducer
    }
}
export default connect(
    mapStateToProps, { userGet, getUserForId, deleteUserForId, resetStore }
)(UserComponent);