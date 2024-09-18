import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostList = () => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=0`);
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, [thread_id]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: newPost }),
      });

      if (!response.ok) {
        throw new Error('投稿に失敗しました');
      }

      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, data]);
      setNewPost('');
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>投稿一覧</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.post}</li>
        ))}
      </ul>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="新しい投稿を入力してください"
          required
        />
        <button type="submit">投稿</button>
      </form>
    </div>
  );
};

export default PostList;