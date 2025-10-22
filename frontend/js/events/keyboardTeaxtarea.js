// Allow Enter key to submit
export function handleTextareaKeydown({ generateBtn }) {
  return function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateBtn.click();
    }
  };
}
