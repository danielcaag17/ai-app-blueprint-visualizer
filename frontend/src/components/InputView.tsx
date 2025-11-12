import { useState } from "react";

interface InputViewProps {
  onStart: (data: string) => void;
}

export function InputView({ onStart }: InputViewProps) {
  const [input, setInput] = useState("hello");

  const handleClick = () => {
    setInput(input + " world");
    onStart(input);
  };

  return (
    <main className="input-viewport" id="inputView">
      {/* Input view */}
      <section className="input-area">
        <h2>Describe Your App</h2>
        <textarea
          className="description-input"
          autoFocus
          id="appDescription"
          placeholder="Describe the app you want to visualize... For example: 'A task management app with user authentication, a dashboard showing tasks, and the ability to create, edit, and delete tasks.'"
        ></textarea>
        <div className="button-group">
          <button
            className="btn-primary"
            id="generateBtn"
            // disabled
            onClick={handleClick}
          >
            Generate Blueprint
          </button>
          <button className="btn-secondary" id="clearBtn">
            Clear
          </button>
        </div>
      </section>
    </main>
  );
}
