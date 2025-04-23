// components/Content.jsx
import React from 'react';
import useBlogStore from '../stores/blogStore';
import { useUserContext } from '../stores/userContext';

function Content() {
    const { posts } = useBlogStore();
    const { userId } = useUserContext();

    return (
        <div>
            <h2>{userId} 님의 블로그</h2>
            <ul>
                {posts.map((post, idx) => (
                    <li key={idx}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Content;
