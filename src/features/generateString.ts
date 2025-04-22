import Markov, { MarkovResult } from "markov-strings";
import { SAMPLE_STRINGS } from "../constants/sampleStrings";

interface GenerateStringParams {
  maxTries: number;
  prng: () => number;
  stateSize: number;
  keywords: string[];
}

export const generateString = ({
  maxTries,
  prng,
  stateSize,
  keywords,
}: GenerateStringParams) => {
  const markov = new Markov({ stateSize: stateSize });

  const data = [...new Set(SAMPLE_STRINGS)];

  markov.addData(data);

  const options = {
    maxTries,
    prng,

    filter: ({ string }: MarkovResult) => checkForKeywords(string, keywords),
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
