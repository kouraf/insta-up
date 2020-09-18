import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Button, Col, Modal, Form, FormGroup, Label, Input } from 'reactstrap';
import './SignUp.css'


export default function SignUp() {
    const firebase = useFirebase();
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState({});

    const toggle = () => setModal(!modal);
    const createNewUser = async (e) => {
        //setLoader(true);
        e.preventDefault();
        firebase.uploadFile('avatar', image)
            .then(({ uploadTaskSnaphot: { ref } }) => ref.getDownloadURL())
            .then(avatar => {
                return firebase.createUser(
                    { email, password },
                    { username, email, avatar, bio }
                )
            }).then(() => {
                setModal(false);
                setEmail('');
                setPassword('');
                setUsername('');
                setImage({});
                //setLoader(false);
            }).catch(err => alert(err.message));
    }
    return (
        <div className="signUp">
            <Button onClick={toggle}>Sign Up</Button>
            <Modal className="signUp__modal" isOpen={modal} toggle={toggle}>
                <Form onSubmit={createNewUser} className="signUp__modal__form">
                    <FormGroup row>
                        <Label md={2} for="name">Name</Label>
                        <Col md={10}>
                            <Input onChange={(e) => setUsername(e.target.value)} type="name" name="name" id="name" placeholder="What is your name ?" />
                        </Col>
                    </FormGroup>
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
                    <FormGroup row>
                        <Label md={2} for="bio">Bio</Label>
                        <Col md={10}>
                            <Input onChange={(e) => setBio(e.target.value)} type="text" name="bio" id="bio" placeholder="tell us something about you !!" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label md={2} for="avatar">Avatar</Label>
                        <Col md={10}>
                            <Input onChange={e => setImage(e.target.files[0])} type="file" name="avatar" id="avatar" />
                        </Col>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </Modal>
        </div>
    )
}
