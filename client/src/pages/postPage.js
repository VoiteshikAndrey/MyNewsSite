import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/loader'
import {PostForm} from '../components/postForm'
import {Navbar} from '../components/navbar';
import {Footer} from '../components/footer';

export const PostPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [post, setPost] = useState(null)
    const postId = useParams().id
  
    const getPost = useCallback(async () => {
      try {
        const fetched = await request(`/api/post/${postId}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setPost(fetched)
      } catch (e) {}
    }, [token, postId, request])
  
    useEffect(() => {
        getPost()
      }, [getPost])
  
    if (loading) {
        return <Loader />
    } 
    return (
      <div className="wrapper">
        <Navbar/>
        { !loading && post && <PostForm post={post}/> }
        <Footer/>
      </div>
    )
  }