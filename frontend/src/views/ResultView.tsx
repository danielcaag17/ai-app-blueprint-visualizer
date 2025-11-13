import { OutputView } from "@components/OutputView";
import { FullView } from "@components/FullView";
import { Loading } from "@components/Loading";
import type { BlueprintResponse } from "@utils/api";
import { useUser } from "@context/useUser.ts";

interface ResultViewProps {
  data: BlueprintResponse | null;
  description: string;
  onReset: () => void;
  isLoading?: boolean;
}

export function ResultView({
  data,
  description,
  onReset,
  isLoading,
}: ResultViewProps) {
  const { userType } = useUser();

  return (
    <>
      {isLoading && <Loading />}
      {userType === "normal" ? (
        <>
          <OutputView data={data} description={description} onReset={onReset} />
          {/* TODO: aquí se pueden añadir componentes extra que compongan la solución
          como structure, BPMN y otra documentación */}
        </>
      ) : (
        <FullView />
      )}
    </>
  );
}
