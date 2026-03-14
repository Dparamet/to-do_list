import { useState } from "react";

type TodoInputProps = {
  onAdd: (text: string) => Promise<void> | void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = async () => {
    if (inputValue.trim() === "") return;
    await onAdd(inputValue);
    setInputValue("");
  };

  return (
    <div className="todo-input-row">
      <input
        type="text"
        className="input-field"
        placeholder="What's the goal today?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd} className="btn-add">Add</button>
    </div>
  );
}
