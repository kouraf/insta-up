import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

export default function Comment({ postId }) {
    const firestore = useFirestore();
    useEffect(() => {
        /*firestore.collection('posts').doc(postId).collection('comments').onSnapshot(snapshot => {
            const comments = snapshot.docs.map(doc => (doc.data()));
            ADDCOMMENT(comments);
        });*/
        firestore.get({ collection: 'comments', where: ['postId', '==', postId] });
    }, [])
    const comments = useSelector((state) => state.firestore.ordered.comments)
    console.log(comments)
    return (
        <div>
            <p>{postId}</p>
            {comments && comments.map(comment => <p>{comment.comment}</p>)}
        </div>
    )
}
