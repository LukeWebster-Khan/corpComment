import { useState } from "react";

import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const [showValidInput, setShowValidInput] = useState(false);
  const [showInvalidInput, setShowInvalidInput] = useState(false);
  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length > MAX_CHARACTERS) return;
    setText(newText);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.includes("#") && text.length >= 5) {
      setShowValidInput(true);
      setTimeout(() => {
        setShowValidInput(false);
      }, 2000);
    } else {
      setShowInvalidInput(true);
      setTimeout(() => {
        setShowInvalidInput(false);
      }, 2000);
      return;
    }

    onAddToList(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidInput ? "form--valid" : ""} ${
        showInvalidInput ? "form--invalid" : ""
      }`}
    >
      <textarea
        id="feedback-textarea"
        placeholder="is present"
        spellCheck={false}
        maxLength={MAX_CHARACTERS}
        value={text}
        onChange={handleChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button type="submit">
          <span>submit</span>
        </button>
      </div>
    </form>
  );
}
