import { OutputView } from "@components/OutputView";
import { Loading } from "@components/Loading";

type Data = { message: string; input: string } | null;

interface ResultViewProps {
  data: Data | null;
  onReset: () => void;
  isLoading?: boolean;
}

export function ResultView({ data, onReset, isLoading }: ResultViewProps) {
  return (
    <>
      {isLoading && <Loading />}
      <OutputView data={data} onReset={onReset} />
      {/* TODO: aquí se pueden añadir componentes extra que compongan la solución
          como structure, BPMN y otra documentación */}
    </>
  );
}
