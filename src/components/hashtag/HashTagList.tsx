import HashTagItem from "./HashTagItem";

import { useFeedbackItemsStore } from "../../store/feedbackItemStore";

export default function HashTagList() {
  const hashTags = useFeedbackItemsStore((state) => state.getHashTags());
  const selectedCompany = useFeedbackItemsStore((state) => state.selectCompany);
  return (
    <ul className="hashtags">
      {hashTags.map((hashTag) => (
        <HashTagItem
          key={hashTag}
          company={hashTag}
          onSelectCompany={selectedCompany}
        />
      ))}
    </ul>
  );
}
