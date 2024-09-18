import React from 'react';
import ThreadItem from './ThreadItem';

const ThreadList = ({ threads }) => (
  <>
    {threads.map((thread) => (
      <ThreadItem key={thread.id} title={thread.title} />
    ))}
  </>
);

export default ThreadList;