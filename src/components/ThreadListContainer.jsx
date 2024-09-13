import React from 'react';
import ThreadItem from './ThreadItem';

const ThreadListContainer = ({ threads }) => (
    <>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} title={thread.title} />
      ))}
    </>
  );
  
  
export default ThreadListContainer;