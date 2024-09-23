import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PostForm.css'; // PostFormのCSSをインポート

const PostForm = ({ onNewPost }) => {
  const { thread_id } = useParams();
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState(null);

  const ERROR_MESSAGES = {
    400: 'バリデーションエラー',
    404: 'そのスレッドは存在しません。',
    500: 'サーバでエラーが発生しました。',
    default: '投稿に失敗しました',
  };

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
        const errorMessage = ERROR_MESSAGES[response.status] || ERROR_MESSAGES.default;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      onNewPost(data);
      setNewPost('');
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="post-form-container">
      {error && <div>{error}</div>}
      <form onSubmit={handlePostSubmit} className="post-form">
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

export default PostForm;