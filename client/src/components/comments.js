import React, {useState, useContext, useEffect, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext'
import '../public/css/comments.css';
export const Comments = ({ postId }) => {
    const auth = useContext(AuthContext);
    const [text, setText] = useState();    
    const [comments, setComments] = useState();
    const {request} = useHttp();
    const {userName, userAvatar} = useContext(AuthContext)
    const changeHandler = event => {
        setText(event.target.value);
    }

    const createComment = async(event) => {
        if(text) {
            const data = await request('/api/post/comment', 'POST', {postId, userName, userAvatar, text});
            getComments();
            //event.target.reset()
        }
    }

    const getComments  = useCallback(async() => {
        const comments = await request(`/api/post/getcomments/${postId}`, 'GET', null);
        console.log("COMMENTS:",comments)
        setComments(comments.reverse());
    },[request])

    useEffect(() => {
        getComments()
      }, [getComments])

    return (
        <div className="">
            <div className="section-header">
                <div className="section-bar">
                    <div className="section-name">Comments</div>
                </div>
            </div>
            {auth.isAuthenticated ? 
            <div className="create-comment">
                <div className="user-avatar">
                    <img src={"http://localhost:3000/images/users-avatars\\"+auth.userAvatar} alt="avatar"/>
                </div>
                <input className="input-comment" type="text" id="comment" name="comment" 
                required placeholder="Write your comment" onChange={changeHandler}/>
                <div className="send-button" onClick={createComment}>
                    <i class="fas fa-paper-plane"></i>
                </div>
                {/* <button className="singin-button" onClick={createComment}>APP COMMENT</button> */}
            </div>
            :<div className="comment-warning">Please login to post comments</div>}
            <div className="comments">
                {comments && (comments.length != 0 ? comments.map((comment) => {
                return (
                    <div className="user-comment">
                        <div className="user-avatar">
                            <img src={"http://localhost:3000/images/users-avatars\\"+comment.userAvatar} alt="avatar"/>
                        </div>
                        <div><b>{comment.userName}</b></div>
                        <div>{comment.text}</div>
                        <div className="comment-date">{comment.date}</div>
                    </div>
                                
                )}) 
                : <div>Be the first to post a comment!</div>)
                }
            </div>
        </div>
  )
}