import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { useFirestore, useFirebase } from 'react-redux-firebase'
import './PostBox.css'
function PostBox() {
    const firestore = useFirestore();
    const firebase = useFirebase();
    const [text, setText] = useState('');
    const [image, setImage] = useState({});
    const [loader, setLoader] = useState(false);

    const handlePost = e => {
        setLoader(true);
        e.preventDefault();
        firebase.uploadFile('images', image)
            .then(({ uploadTaskSnaphot: { ref } }) => ref.getDownloadURL())
            .then(imageURL => {
                return firestore.collection('posts').add({
                    text,
                    imageURL,
                    uid: firebase.auth().currentUser.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
            .then(() => {
                setText('');
                setImage({});
                setLoader(false);
            })
            .catch(error => alert(error.message))
    }
    return (
        <div className="postbox col-md-4 col-12">
            {loader ? <i className="fa fa-refresh fa-spin" style={{ fontSize: 24 }}></i>
                : <Form onSubmit={handlePost}>
                    <FormGroup row>
                        <Col md={12}>
                            <Input onChange={(e) => setText(e.target.value)} type="text" name="text" id="text" placeholder="Say something ?" />
                        </Col>
                    </FormGroup>
                    <FormGroup className="postbox__inputfile" row>
                        <>
                            <Label for="image">
                                <i>
                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-image" className="svg-inline--fa fa-file-image fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"></path></svg>
                                </i>
                            </Label>
                            <Col>
                                <Input onChange={e => setImage(e.target.files[0])} type="file" name="image" id="image" />
                            </Col>
                        </>
                        <Button type="submit">Post</Button>
                    </FormGroup>
                </Form>}
        </div>
    )
}
export default PostBox;