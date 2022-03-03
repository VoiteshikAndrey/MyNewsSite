import React from 'react'

export const BlogVertical = ({loading, posts}) => (
    <>
    <div className="section-header">
        <div className="section-bar">
            <div className="section-name">All posts</div>
        </div>
    </div>

    <div className="blog-vertical">
        {!loading && posts.map((post) => {
            return (
                <a href={`/post/${post._id}`}>
                <article >
                    <div className="post">
                        <div className="image zoom-img">
                            <div className="post-category">FITR</div>
                            <img src={`images\\${post.image}`} alt="background-img"/>
                        </div>
                        <div className="content-blog">
                            <div className="title-blog">{post.title}</div>
                            <div className="meta-info-blog">
                                <ul className="meta-info-blog-content">
                                    <li className="post-meta-date">{post.date}</li>
                                    <li className="post-meta-likes">24 Likes</li>
                                    {/* <li className="post-meta-comments">12 Comments</li> */}
                                </ul>
                            </div>
                        </div>
                    </div> 
                </article>
                </a>               
            )})
        } 
    </div>
    </>
)
