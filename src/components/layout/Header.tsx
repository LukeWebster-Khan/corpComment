import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

import { useFeedbackItemsStore } from "../../store/feedbackItemStore";

export default function Header() {
  const handleAddToList = useFeedbackItemsStore((state) => state.addItemToList);
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={handleAddToList} />
    </header>
  );
}
