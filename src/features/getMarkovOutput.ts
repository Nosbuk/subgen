import Markov, { MarkovResult } from "markov-strings";
import { SAMPLE_STRINGS } from "../constants/sampleStrings";

const data = [...new Set(SAMPLE_STRINGS)];

// TODO: Maybe put whole Markov state here instead of new interface but then need to omit result
interface getMarkovOutputParams {
  maxTries: number;
  amount: number;
  prng: () => number;
  stateSize: number;
  keywords: string[];
}

export const getMarkovOutput = ({
  maxTries,
  amount,
  prng,
  stateSize,
  keywords,
}: getMarkovOutputParams) => {
  let results: MarkovResult[] = [] as MarkovResult[];
  let errors: string[] = [];

  const markov = new Markov({ stateSize: stateSize });

  markov.addData(data);

  const options = {
    maxTries,
    prng,

    filter: (result: MarkovResult) => {
      const { string } = result;

      return (
        checkForKeywords(string, keywords) &&
        checkForDuplicates(string, results) &&
        checkForDataDuplicates(string)
      );
    },
  };

  for (let i = 0; i < amount; i++) {
    try {
      const result = markov.generate(options);
      results.push(result);
    } catch (error) {
      if (error instanceof Error) {
        errors.push(error.message);
      }

      if (typeof error === "string") {
        errors.push(error);
      }

      if (typeof error === "object") {
        errors.push(JSON.stringify(error));
      }
    }
  }

  return { results, errors };
};

const checkForKeywords = (string: string, keywords: string[]) =>
  keywords
    .map((keyword) =>
      string.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    )
    .reduce((prev, curr) => prev && curr, true);

const checkForDuplicates = (string: string, results: MarkovResult[]) =>
  results.reduce((prev, curr) => prev && curr.string !== string, true);

const checkForDataDuplicates = (string: string) =>
  data.reduce((prev, curr) => prev && curr !== string, true);
