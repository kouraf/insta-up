import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'

import './Header.css'

function Header({ auth: { uid }, profile: { isLoaded, isEmpty, username, avatar } }) {

    return (
        <header className="header ">
            <div className="header__instaUp">
                <Link className="header__user__link" to={'/'}>
                    <img
                        className="header__image"
                        src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"
                        alt="" />
                </Link>
                <Link className="header__user__link" to={'/'}>
                    <h4 className="header__text">InstaUp</h4>
                </Link>
            </div>
            <div className="header__user">
                <Link className="header__user__link" to={`/user/${uid}`}>
                    <img src={avatar} alt="" className="header__user__avatar" />
                </Link>
                <Link className="header__user__link" to={`/user/${uid}`}>
                    <h4 className="header__user__username">{username}</h4>
                </Link>
            </div>
            <div className="header__buttons">
                {isLoaded ? <>
                    {isEmpty ?
                        <>
                            <SignIn />
                            <SignUp />
                        </>
                        :
                        <SignOut />}
                </>
                    :
                    <i className="fa fa-refresh fa-spin" style={{ fontSize: 24 }}></i>}
            </div>
        </header>
    )
}
export default connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
}))(Header)