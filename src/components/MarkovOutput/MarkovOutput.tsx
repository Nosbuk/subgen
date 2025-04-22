import { MarkovContextStateKeys } from "../../contexts/MarkovContext";
import { useMarkov } from "../../hooks/useMarkov";

export const MarkovOutput = () => {
  const { markovState } = useMarkov();

  const generatedString =
    markovState[MarkovContextStateKeys.GENERATED_RESULT].string;
  const isGeneratedStringNotEmpty = generatedString?.length > 0;
  return (
    <div>
      {isGeneratedStringNotEmpty
        ? generatedString
        : "Click GENERATE below to create subject line"}
    </div>
  );
};
