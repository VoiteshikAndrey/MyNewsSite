import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/loader'
import {Body} from '../components/body'
import {Navbar} from '../components/navbar';
import { BlogVertical } from '../components/blog-vertical'
import { BlogMain } from '../components/blog-main';

import {Footer} from '../components/footer';

export const NewsPage = () => {
    const [posts, setPosts] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    
     const fetchLinks =  useCallback(async () => {
        try {
        const fetched = await request('/api/post/', 'GET', null)
        setPosts(fetched.reverse())
        } catch (e) {}
    }, [token, request])
    
    useEffect(() => {
        fetchLinks()
      }, [fetchLinks])
    
    if (loading) {
        return <Loader/>
    }
    return (
        <div className="wrapper">
            <Navbar/>
            <div className="container">
                {!loading && <BlogMain loading={loading} posts={posts}/>}
                {!loading && <BlogVertical loading={loading} posts={posts}/>}
            </div>
            <Footer/>
        </div>
    )
};