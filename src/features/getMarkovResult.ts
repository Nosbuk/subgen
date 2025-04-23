import Markov, { MarkovResult } from "markov-strings";
import { SAMPLE_STRINGS } from "../constants/sampleStrings";

const data = [...new Set(SAMPLE_STRINGS)];

// TODO: Maybe put whole Markov state here instead of new interface but then need to omit result
interface getMarkovResultParams {
  maxTries: number;
  prng: () => number;
  stateSize: number;
  keywords: string[];
}

export const getMarkovResult = async ({
  maxTries,
  prng,
  stateSize,
  keywords,
}: getMarkovResultParams) => {
  let result: MarkovResult = {} as MarkovResult;
  const markov = new Markov({ stateSize: stateSize });

  markov.addData(data);

  const options = {
    maxTries,
    prng,

    filter: (result: MarkovResult) => {
      const { string } = result;

      return checkForKeywords(string, keywords);
    },
  };

  try {
    result = await markov.generate(options);
  } catch (error) {
    console.error("Error generating Markov result:", error);
  }
  return result;
};

const checkForKeywords = (string: string, keywords: string[]) =>
  keywords
    .map((keyword) =>
      string.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    )
    .reduce((prev, curr) => prev && curr, true);
