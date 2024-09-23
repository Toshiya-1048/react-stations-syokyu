import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// スレッドのタイトルを取得するためスレッド一覧を取得するためのAPIを利用
const ThreadTitle = ({ setThreadTitle }) => {
  const { thread_id } = useParams();
  const [error, setError] = useState(null);

  const ERROR_MESSAGES = {
    400: 'リクエストされたデータが間違っています',
    404: 'データが見つかりません',
    500: '内部サーバーエラー',
    default: 'スレッドタイトルの取得に失敗しました',
  };

  useEffect(() => {
    const fetchThreadTitle = async () => {
        let found = false;
        let offset = 0;
        const limit = 100; // 最大100件まで探索

        try {
          while (!found && offset < limit) {
            console.log(`Fetching threads with offset: ${offset}`);
            const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`);
            if (!response.ok) {
              const errorMessage = ERROR_MESSAGES[response.status] || ERROR_MESSAGES.default;
              throw new Error(errorMessage);
            }
            const data = await response.json();
            console.log('Fetched data:', data);

            if (!data || !Array.isArray(data)) {
              throw new Error('取得したデータが不正です');
            }

            const thread = data.find(thread => thread.id === thread_id);
            if (thread) {
              setThreadTitle(thread.title); // スレッドタイトルをステートに設定
              found = true;
              break;
            } 
            offset += 10; // 次の10件を取得
          }
          if (!found) {
            throw new Error('指定されたスレッドが見つかりませんでした');
          }
        } catch (error) {
          setError(error.message);
        }
      };

    fetchThreadTitle(); // スレッドタイトルを取得
  }, [thread_id, setThreadTitle, setError]);

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default ThreadTitle;