import { useContext } from "react";
import { MarkovContext } from "../contexts/MarkovContext";

export const useMarkov = () => {
  const { markovState, dispatchMarkov } = useContext(MarkovContext);

  return { markovState, dispatchMarkov };
};
