import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Button, Col, Modal, Form, FormGroup, Label, Input } from 'reactstrap';
import './SignIn.css'

export default function SignIn() {
    const firebase = useFirebase();
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const toggle = () => setModal(!modal);
    const handleLogin = (e) => {
        e.preventDefault();
        firebase.login({ email, password })
            .then(() => {
                setModal(false);
                setEmail('');
                setPassword('');
            }).catch(err => alert(err.message));
    }
    return (
        <div className="signIn">
            <Button onClick={toggle}>Sign In</Button>
            <Modal className="signIn__modal" isOpen={modal} toggle={toggle}>
                <Form onSubmit={handleLogin} className="signIn__modal__form">
                    <FormGroup row>
                        <Label md={2} for="email">Email</Label>
                        <Col md={10}>
                            <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="something@idk.cool" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label md={2} for="password">Password</Label>
                        <Col md={10}>
                            <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="don't tell!" />
                        </Col>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </Modal>
        </div>
    )
}
