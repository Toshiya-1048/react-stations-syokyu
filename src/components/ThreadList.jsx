import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import PaginationButton from './PaginationButton';
import ThreadListContainer from './ThreadListContainer';
import '../styles/ThreadList.css';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(null);

  const fetchThreads = async (offset, append = false) => {
    try {
      setLoading(true);
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`);
      if (response.ok) {
        const data = await response.json();
        if (append) {
          setThreads((prevThreads) => [...prevThreads, ...data]); // 既存のスレッドに新しいデータを追加
        } else {
          setThreads(data); // 初回ロード時にスレッドを上書き
        }
        setError(null);
      } else {
        const errorData = await response.json();

        if (response.status === 400) {
          setError(`Error 400: ${errorData.ErrorMessageJP || 'リクエストが正しくありません'}`);
        } else if (response.status === 500) {
          setError(`Error 500: ${errorData.ErrorMessageJP || 'サーバー内部エラーが発生しました'}`);
        } else {
          setError('不明なエラーが発生しました');
        }
      }
    } catch (error) {
      setError('サーバとの通信に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  // 初回レンダリング時にのみスレッドを取得
  useEffect(() => {
    fetchThreads(0, false); // 初回ロード時にスレッドを上書き
  }, []);

  const handleLoadMore = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    fetchThreads(newOffset, true); // 新しいデータを追加
  };

  return (
    <section className="ThreadList">
      <div className="tabs-container">
        <div className="tabs">
          <button className="tab">ダミー</button>
          <button className="tab">ダミー</button>
          <button className="tab">ダミー</button>
          <button className="tab">ダミー</button>
        </div>
        <div className="thread-list-title">
          スレッド一覧
        </div>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      <ThreadListContainer threads={threads} />
      {!loading && <PaginationButton onClick={handleLoadMore} />}
    </section>
  );
};

export default ThreadList;
