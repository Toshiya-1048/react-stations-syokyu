import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


// スレッドのタイトルを取得するためスレッド一覧を取得するためのAPIを利用
const ThreadTitle = ({ setThreadTitle }) => {
  const { thread_id } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreadTitle = async () => {
        let found = false;
        let offset = 0;
        const limit = 100; // 最大100件まで探索

        try {
          while (!found && offset < limit) {
            const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`);
            if (!response.ok) {
              throw new Error(`スレッド一覧の取得に失敗しました: ${response.statusText}`);
            }
            const data = await response.json();

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
          setError(`スレッドタイトルの取得に失敗しました: ${error.message}`);
        }
      };

    fetchThreadTitle(); // スレッドタイトルを取得
  }, [thread_id, setThreadTitle]);

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default ThreadTitle;