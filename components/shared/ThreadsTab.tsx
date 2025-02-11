import React from "react";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  // fetch the profile threads
  return <div>ThreadsTab</div>;
};

export default ThreadsTab;
