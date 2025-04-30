import { createContext, useReducer, ReactNode, ActionDispatch } from "react";
import { MarkovResult } from "markov-strings";

import { getMarkovOutput } from "../features/getMarkovOutput";

export enum MarkovContextReducerActionTypes {
  SET_MAX_TRIES = "maxTries",
  SET_AMOUNT = "setAmount",
  SET_PRNG = "setPrng",
  SET_ERRORS = "setErrors",
  SET_STATE_SIZE = "setStateSize",
  ADD_KEYWORDS = "addKeywords",
  REMOVE_KEYWORD = "removeKeyword",
  GENERATE_RESULT = "generateResult",
}

export enum MarkovContextStateKeys {
  MAX_TRIES = "maxTries",
  AMOUNT = "amount",
  PRNG = "prng",
  ERRORS = "errors",
  STATE_SIZE = "stateSize",
  KEYWORDS = "keywords",
  GENERATED_RESULT = "generatedResult",
}

export const MarkovContextReducerActionTargets = {
  [MarkovContextReducerActionTypes.SET_MAX_TRIES]:
    MarkovContextStateKeys.MAX_TRIES,
  [MarkovContextReducerActionTypes.SET_AMOUNT]: MarkovContextStateKeys.AMOUNT,
  [MarkovContextReducerActionTypes.SET_PRNG]: MarkovContextStateKeys.PRNG,
  [MarkovContextReducerActionTypes.SET_STATE_SIZE]:
    MarkovContextStateKeys.STATE_SIZE,
  [MarkovContextReducerActionTypes.ADD_KEYWORDS]:
    MarkovContextStateKeys.KEYWORDS,
  [MarkovContextReducerActionTypes.REMOVE_KEYWORD]:
    MarkovContextStateKeys.KEYWORDS,
  [MarkovContextReducerActionTypes.GENERATE_RESULT]:
    MarkovContextStateKeys.GENERATED_RESULT,
};

interface MarkovContextInterface {
  [MarkovContextStateKeys.MAX_TRIES]: number;
  [MarkovContextStateKeys.AMOUNT]: number;
  [MarkovContextStateKeys.PRNG]: string;
  [MarkovContextStateKeys.ERRORS]: string[];
  [MarkovContextStateKeys.STATE_SIZE]: number;
  [MarkovContextStateKeys.KEYWORDS]: string[];
  [MarkovContextStateKeys.GENERATED_RESULT]: MarkovResult[];
}

export enum PRNG {
  MATH_RANDOM = "mathRandom",
  OTHER = "other",
}

// TODO: Add more prngs
export const prngDictionary = {
  [PRNG.MATH_RANDOM]: Math.random,
  [PRNG.OTHER]: Math.random,
};

const defaultMarkovContextValue: MarkovContextInterface = {
  [MarkovContextStateKeys.MAX_TRIES]: 1000,
  [MarkovContextStateKeys.AMOUNT]: 20,
  [MarkovContextStateKeys.PRNG]: PRNG.MATH_RANDOM,
  [MarkovContextStateKeys.ERRORS]: [],
  [MarkovContextStateKeys.STATE_SIZE]: 2,
  [MarkovContextStateKeys.KEYWORDS]: [],
  [MarkovContextStateKeys.GENERATED_RESULT]: [] as MarkovResult[],
};

export const MarkovContext = createContext({
  markovState: defaultMarkovContextValue,

  // TODO: refactor type below
  dispatchMarkov: {} as ActionDispatch<[action: MarkovContextReducerAction]>,
});

type MarkovContextReducerAction =
  | { type: MarkovContextReducerActionTypes.SET_MAX_TRIES; payload: number }
  | { type: MarkovContextReducerActionTypes.SET_AMOUNT; payload: number }
  | { type: MarkovContextReducerActionTypes.SET_STATE_SIZE; payload: number }
  | { type: MarkovContextReducerActionTypes.SET_PRNG; payload: string }
  | { type: MarkovContextReducerActionTypes.ADD_KEYWORDS; payload: string[] }
  | { type: MarkovContextReducerActionTypes.REMOVE_KEYWORD; payload: string }
  | {
      type: MarkovContextReducerActionTypes.GENERATE_RESULT;
      payload: undefined;
    };

const MarkovContextReducer = (
  state: MarkovContextInterface,
  action: MarkovContextReducerAction
) => {
  const { type, payload } = action;

  switch (type) {
    case MarkovContextReducerActionTypes.SET_MAX_TRIES:
      return {
        ...state,
        [MarkovContextStateKeys.MAX_TRIES]: payload,
      };
    case MarkovContextReducerActionTypes.SET_AMOUNT:
      return {
        ...state,
        [MarkovContextStateKeys.AMOUNT]: payload,
      };
    case MarkovContextReducerActionTypes.SET_PRNG:
      return {
        ...state,
        [MarkovContextStateKeys.PRNG]: payload,
      };
    case MarkovContextReducerActionTypes.SET_STATE_SIZE:
      return {
        ...state,
        [MarkovContextStateKeys.STATE_SIZE]: payload,
      };
    case MarkovContextReducerActionTypes.ADD_KEYWORDS:
      const sanitizedKeywords = payload.filter((keywords) => keywords !== "");

      return {
        ...state,
        [MarkovContextStateKeys.KEYWORDS]: [
          ...state[MarkovContextStateKeys.KEYWORDS],
          ...sanitizedKeywords,
        ],
      };
    case MarkovContextReducerActionTypes.REMOVE_KEYWORD:
      const filteredKeywords = state[MarkovContextStateKeys.KEYWORDS].filter(
        (keyword) => keyword !== payload
      );

      return {
        ...state,
        [MarkovContextStateKeys.KEYWORDS]: filteredKeywords,
      };
    case MarkovContextReducerActionTypes.GENERATE_RESULT:
      const markovOutput = getMarkovOutput({
        maxTries: state[MarkovContextStateKeys.MAX_TRIES],
        amount: state[MarkovContextStateKeys.AMOUNT],

        // TODO: Add more prngs and index them from dictionary here
        prng: Math.random,
        stateSize: state[MarkovContextStateKeys.STATE_SIZE],
        keywords: state[MarkovContextStateKeys.KEYWORDS],
      });

      const { results, errors } = markovOutput;

      return {
        ...state,
        [MarkovContextStateKeys.GENERATED_RESULT]: results,
        [MarkovContextStateKeys.ERRORS]: errors,
      };
  }
};

export const MarkovContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [markovState, dispatchMarkov] = useReducer(
    MarkovContextReducer,
    defaultMarkovContextValue
  );

  return (
    <MarkovContext.Provider value={{ markovState, dispatchMarkov }}>
      {children}
    </MarkovContext.Provider>
  );
};
