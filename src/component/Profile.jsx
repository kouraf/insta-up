import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Button, Col, Modal, ModalHeader, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './SignUp.css'
import './Profile.css';

export default function Profile({ auth, userProfile, user }) {
    const firebase = useFirebase();
    const [modal, setModal] = useState(false);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState({});

    const toggle = () => setModal(!modal);
    const editUser = async (e) => {
        //setLoader(true);
        e.preventDefault();
        if (image.name) {
            firebase.uploadFile('avatar', image)
                .then(({ uploadTaskSnaphot: { ref } }) => ref.getDownloadURL())
                .then(avatar => {
                    return firebase.firestore().collection('users').doc(auth).set({

                        username, avatar, bio
                    }, { merge: true })
                }).then(() => {
                    setModal(false);
                    setUsername('');
                    setImage({});
                    //setLoader(false);
                }).catch(err => alert(err.message));
        } else {
            firebase.firestore().collection('users').doc(auth).set({

                username, bio
            }, { merge: true })
                .then(() => {
                    setModal(false);
                    setUsername('');
                    setImage({});
                    //setLoader(false);
                }).catch(err => alert(err.message));
        }

    }
    return (
        <div onClick={() => auth === userProfile && toggle()} className="profile col-md-3 col-11 order-first">
            <div className="card profile_card ">
                <div className="box">
                    <div className="img">
                        <img src={user.avatar} alt={user.username} />
                    </div>
                    <h2>{user.username}<br /><span>{user.email}</span></h2>
                    <p> {user.bio}</p>
                </div>
            </div>
            <Modal className="signUp__modal" isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <Alert color="danger">
                        all fields are required!
                    </Alert>
                </ModalHeader>
                <Form onSubmit={editUser} className="signUp__modal__form">
                    <FormGroup row>
                        <Label md={2} for="name">Name</Label>
                        <Col md={10}>
                            <Input onChange={(e) => setUsername(e.target.value)} type="name" name="name" id="name" placeholder="What is your name ?" />
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

    );
}


