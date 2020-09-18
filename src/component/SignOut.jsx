import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Button } from 'reactstrap';
import './SignOut.css';

export default function SignOut() {
    const firebase = useFirebase();
    return (

        <Button onClick={() => firebase.logout()}>Sign Out</Button>

    )
}
