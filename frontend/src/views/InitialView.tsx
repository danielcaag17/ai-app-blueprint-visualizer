import { InputView } from "@components/InputView";

interface InitialViewProps {
  onStart: (input: string) => void;
}

export function InitialView({ onStart }: InitialViewProps) {
  return (
    <>
      <InputView onStart={onStart} />
    </>
  );
}
