import React from 'react'

export const BlogMain = ({loading, posts}) => {
    let content = []
    if(posts.length > 0) {
        for(let i = 0; i < 3; i++) {
            content.push(
                        <a href={`/post/${posts[i]._id}`} className="main-news zoom-img" key={posts[i].id}>
                                <div className="image">
                                    <div className="gradient"></div>
                                    <img src={`images\\${posts[i].image}`} alt="background-img"/>
                                </div>
                                <div className="main-news-content">
                                    <div className="post-category">FITR</div>
                                    <div className="main-news-title">{posts[i].title}</div>
                                    <div className="main-news-footer">
                                        <div className="main-news-date">{posts[i].date}</div> 
                                        {/* <div className="main-news-info">12 комментариев</div> */}
                                    </div>
                                </div>
                        </a>
                        )
        }
    }
    
    return (
        <div className="section">
            {!loading && content}
        </div>);
}
