import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import FeedbackItem from "./FeedbackItem";

import { useFeedbackItemsStore } from "../../store/feedbackItemStore";

export default function FeedbackList() {
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  const filteredFeedbackItems = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackItems()
  );
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbackItems.map((feedBackItem) => (
        <FeedbackItem key={feedBackItem.id} feedBackItem={feedBackItem} />
      ))}
    </ol>
  );
}
