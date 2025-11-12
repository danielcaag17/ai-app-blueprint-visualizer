import { OutputView } from "@components/OutputView";
import { Loading } from "@components/Loading";
import type { BlueprintResponse } from "api.ts";

interface ResultViewProps {
  data: BlueprintResponse ;
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
