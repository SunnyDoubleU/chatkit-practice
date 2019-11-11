import React, { Component } from 'react'
import { getUser, logout } from '../utils/auth';
import { Link } from "react-router-dom"

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: getUser()
        }
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser() {
        logout()
            .then(() => {
                this.setState({ user: null })
            })
            .then(() => {
                this.props.history.push("/");
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        {
            if (this.state.user) {
                return (
                    <div>
                        <Link to={`/allfriends`}>Chat</Link>
                        <p>hello {this.state.user.firstname}</p>
                        <p onClick={this.logoutUser}>Logout</p>
                    </div>
                )
            } else {
                return (
                    <Link to={`/login`}>Login</Link>
                )
            }

        }
    }
}
