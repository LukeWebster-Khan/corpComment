import { useState } from "react";

import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../lib/types";

type FeedbackItemProps = {
  feedBackItem: TFeedbackItem;
};
export default function FeedbackItem({ feedBackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedBackItem.upvoteCount);

  const handleExpand = () => {
    setOpen((prev) => !prev);
  };

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvoteCount((prev) => prev + 1);
    e.stopPropagation();
    e.currentTarget.disabled = true;
  };
  return (
    <li
      onClick={handleExpand}
      className={`feedback ${open ? "feedback--expand" : ""}`}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedBackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedBackItem.company}</p>
        <p>{feedBackItem.text}</p>
      </div>
      <p>{feedBackItem.daysAgo === 0 ? "NEW" : `${feedBackItem.daysAgo}d`}</p>
    </li>
  );
}
