import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { useParams } from "react-router-dom";
import Post from './Post';
import PostBox from './PostBox';
import Profile from './Profile';
import './Feed.css';
function Feed({ posts, auth, profile, users, comments, likes }) {
    const { userId } = useParams();

    return (
        <div className="feed">
            {(users && posts) && userId ?
                <div className="row">
                    <div className="col-md-5 col-11">
                        {((users && posts) &&
                            posts.filter(post => post.uid === userId).map(({ uid, imageURL, text, id }) => {
                                var Likes;
                                if (likes) Likes = likes.filter(like => like.postId === id)
                                return (
                                    <Post key={id} likes={Likes} comments={comments} userPostId={uid} postId={id} users={users} imageURL={imageURL} text={text} />
                                );
                            }))}
                    </div>
                    <Profile auth={auth.uid} userProfile={userId} user={users[userId]} />
                </div>
                :
                <>
                    {profile.isLoaded ?
                        <>
                            {!profile.isEmpty &&
                                <div className="row">
                                    <PostBox />
                                </div>}
                        </>
                        :
                        <i className="fa fa-refresh fa-spin" style={{ fontSize: 24 }}></i>
                    }
                    {((users && posts) &&
                        <div className="row">
                            <div className="col-md-5 col-12">
                                {posts.map(({ uid, imageURL, text, id }) => {
                                    var Likes;
                                    if (likes) Likes = likes.filter(like => like.postId === id)
                                    return (
                                        <Post key={id} likes={Likes} comments={comments} userPostId={uid} postId={id} users={users} imageURL={imageURL} text={text} />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            }


        </div>
    )
}

export default compose(
    firestoreConnect((props) => [
        { collection: 'posts', orderBy: ["createdAt", "desc"] },
        { collection: 'users' }, { collection: 'likes' }, { collection: 'comments', orderBy: ["createdAt"] }]),
    connect(({ firebase: { auth, profile }, firestore }) => ({
        auth,
        profile,
        posts: firestore.ordered.posts,
        users: firestore.data.users,
        comments: firestore.ordered.comments,
        likes: firestore.ordered.likes
    })))(Feed);
