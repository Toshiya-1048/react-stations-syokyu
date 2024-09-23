import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PostList.css'; // PostListのCSSをインポート
import ThreadTitle from './ThreadTitle'; // ThreadTitleをインポート
import PostForm from './PostForm'; // PostFormをインポート

const PostList = () => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [threadTitle, setThreadTitle] = useState('');

  const ERROR_MESSAGES = {
    400: 'リクエストされたデータが間違っています',
    404: 'データが見つかりません',
    500: '内部サーバーエラー',
    default: 'データの取得に失敗しました',
  };

  useEffect(() => {
    const fetchPosts = async () => {
      let allPosts = [];
      let offset = 0;
      const limit = 100; // 最大100件まで読み込む
      let hasMore = true;

      // 一度に10件までしか読み込めないので、上限を１００として、while文で自動で読み込む処理を行う
      try {
        while (hasMore && offset < limit) {
          const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${offset}`);
          if (!response.ok) {
            const errorMessage = ERROR_MESSAGES[response.status] || ERROR_MESSAGES.default;
            throw new Error(errorMessage);
          }
          const data = await response.json();

          if (!data || !Array.isArray(data.posts)) {
            throw new Error('データ形式が不正です');
          }

          allPosts = allPosts.concat(data.posts);
          if (data.posts.length < 10) {
            hasMore = false; // 10件未満の場合、これ以上の投稿はない
          }

          offset += 10; // 次の10件を取得
        }

        setPosts(allPosts);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, [thread_id]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // 新しい投稿を先頭に追加
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <ThreadTitle setThreadTitle={setThreadTitle} /> {/* ThreadTitleコンポーネントを使用 */}
        <h2 className="post-list-title">{threadTitle || 'テストタイトル'}</h2> {/* スレッドタイトルを表示 */}
      </div>
      <PostForm onNewPost={handleNewPost} /> {/* PostFormを投稿一覧の上に表示 */}
      <ul className="post-list">
        {Array.isArray(posts) && posts.map(post => (
          <li key={post.id} className="post-item">{post.post}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;