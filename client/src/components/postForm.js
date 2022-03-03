import React, {useContext} from 'react'
import {useHttp} from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import {Comments} from './comments';
import '../public/css/postForm.css';
import {AuthContext} from '../context/AuthContext';

export const PostForm = ({ post }) => {
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  let history = useHistory();

  const DeletePost = async () => {
    const result = await request('/api/admin/delete', 'POST', post);
    history.push('/');
  }

  return (
    <div className="container">
      <div className="post-content">
        <div className="paper-wrapper">
            <div className="image preview-img">
                <div className="post-category">FITR</div>
                <img src={`http://localhost:3000/images\\${post.image}`} alt="background-img"/>
            </div>
            <div className="content-blog">
                <div className="post-title">{post.title}</div>
                <pre className="post-text">{post.text}</pre>
                <div className="meta-info-blog">
                    <ul className="meta-info-blog-content">
                        <li className="post-meta-date">{post.date}</li>
                        <li className="post-meta-likes">24 Likes</li>
                        <li className="post-meta-comments">{post.comment.length} Comments</li>
                    </ul>
                    {auth.role == "admin" && 
                    <div className="post-settings">
                      <a href={`/edit/${post._id}`}><i className="far fa-edit"></i></a>
                      <i class="fas fa-trash-alt" onClick={DeletePost}></i>
                    </div>}
                </div>
            </div>
        </div> 
        <Comments postId = {post._id} comments = {post.comment}/>
      </div>
    </div>
  )
} 