import Markov, { MarkovResult } from "markov-strings";
import { SAMPLE_STRINGS } from "../constants/sampleStrings";

interface getMarkovResultParams {
  maxTries: number;
  prng: () => number;
  stateSize: number;
  keywords: string[];
}

export const getMarkovResult = ({
  maxTries,
  prng,
  stateSize,
  keywords,
}: getMarkovResultParams) => {
  const markov = new Markov({ stateSize: stateSize });

  const data = [...new Set(SAMPLE_STRINGS)];

  markov.addData(data);

  const options = {
    maxTries,
    prng,

    filter: (result: MarkovResult) => {
      const { string } = result;

      return checkForKeywords(string, keywords);
    },
  };

  const result = markov.generate(options);

  return result;
};

const checkForKeywords = (string: string, keywords: string[]) =>
  keywords
    .map((keyword) =>
      string.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    )
    .reduce((prev, curr) => prev && curr, true);
