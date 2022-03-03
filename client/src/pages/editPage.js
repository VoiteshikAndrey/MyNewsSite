import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/loader'
import {Navbar} from '../components/navbar';
import {Footer} from '../components/footer';

import {EditForm} from '../components/editForm';

export const EditPage = () => {
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

    return (
      <div className="wrapper">
        <Navbar/>
        {post && <EditForm post={post}/>}
        <Footer/>
      </div>
    )
  }




