import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Button, Form, Input } from 'reactstrap';
import './Post.css';

function Post({ likes, firebase, comments, firestore, userPostId, auth: { uid }, profile: { avatar, isLoaded, isEmpty }, imageURL, text, postId, users }) {
    const [comment, setComment] = useState('');
    const addComment = (e) => {
        e.preventDefault();
        firestore.collection('comments').add({
            comment,
            user: uid,
            postId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            setComment('');
        })
    };
    const handleLike = (e) => {
        e.preventDefault();
        const like = likes.filter(({ user }) => user === uid);
        if (like.length) {
            firestore.collection('likes').where('user', '==', uid).get()
                .then(snapshot => snapshot.docs[0].ref.delete());
        }
        else
            firestore.collection('likes').add({
                user: uid,
                postId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {

            })
    };
    return (
        (users) ?
            <div className="post">
                <div className="post__header">
                    <Link className="post__header__link" to={`/user/${userPostId}`}>
                        <img src={users[userPostId].avatar} alt="avatar" className="post__header__avatar" />
                    </Link>
                    <Link className="post__header__link" to={`/user/${userPostId}`}>
                        <h4 className="post__header__username">{users[userPostId].username}</h4>
                    </Link>
                </div>
                <img src={imageURL} alt="post_image" className="post__image" />
                {uid && <div className="post__like">
                    {likes && likes.length > 0 ? <>
                        {likes.filter(({ user }) => user === uid).length ? <button className="post__unlike__button" onClick={handleLike}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg></button>
                            : <button className="post__like__button" onClick={handleLike}><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg></button>
                        }<div><p>
                            {likes.length}
                        </p></div>
                    </>
                        : <button className="post__like__button" onClick={handleLike}><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg></button>
                    }
                </div>}
                <div className="post__footer">
                    <p><strong>{users[userPostId].username} :</strong> {text}</p>
                    {comments && comments.map(comment => comment.postId === postId && <p key={comment.id} ><strong>{users[comment.user].username} :</strong> {comment.comment}</p>)}
                </div>
                {
                    isLoaded && !isEmpty &&
                    <Form onSubmit={addComment} className="post__form">
                        <Input value={comment} onChange={e => setComment(e.target.value)} type="text" name="comment" placeholder="say something nice !" />
                        <Button type="submit">Post</Button>
                    </Form>
                }
            </div >
            : <div></div>
    )
}

export default compose(
    withFirestore,
    connect(({ firebase: { auth, profile } }) => ({
        auth,
        profile
    })))(Post);


