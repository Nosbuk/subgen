import { createContext, useReducer, ReactNode, ActionDispatch } from "react";
import { MarkovResult } from "markov-strings";

import { getMarkovResult } from "../features/getMarkovResult";

export enum MarkovContextReducerActionTypes {
  SET_MAX_TRIES = "maxTries",
  SET_PRNG = "prng",
  SET_STATE_SIZE = "stateSize",
  ADD_KEYWORDS = "addKeywords",
  REMOVE_KEYWORD = "removeKeyword",
  GENERATE_RESULT = "generateResult",
}

export enum MarkovContextStateKeys {
  MAX_TRIES = "maxTries",
  PRNG = "prng",
  STATE_SIZE = "stateSize",
  KEYWORDS = "keywords",
  GENERATED_RESULT = "generatedResult",
}

interface MarkovContextInterface {
  [MarkovContextStateKeys.MAX_TRIES]: number;
  [MarkovContextStateKeys.PRNG]: string;
  [MarkovContextStateKeys.STATE_SIZE]: number;
  [MarkovContextStateKeys.KEYWORDS]: string[];
  [MarkovContextStateKeys.GENERATED_RESULT]: MarkovResult;
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
  [MarkovContextStateKeys.MAX_TRIES]: 20,
  [MarkovContextStateKeys.PRNG]: PRNG.MATH_RANDOM,
  [MarkovContextStateKeys.STATE_SIZE]: 2,
  [MarkovContextStateKeys.KEYWORDS]: [],
  [MarkovContextStateKeys.GENERATED_RESULT]: {} as MarkovResult,
};

export const MarkovContext = createContext({
  markovState: defaultMarkovContextValue,

  // TODO: refactor type below
  dispatchMarkov: {} as ActionDispatch<[action: MarkovContextReducerAction]>,
});

type MarkovContextReducerAction =
  | { type: MarkovContextReducerActionTypes.SET_MAX_TRIES; payload: number }
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
      return {
        ...state,
        [MarkovContextStateKeys.KEYWORDS]: [
          ...state[MarkovContextStateKeys.KEYWORDS],
          ...payload.filter((keywords) => keywords !== ""),
        ],
      };
    case MarkovContextReducerActionTypes.REMOVE_KEYWORD:
      return {
        ...state,
        [MarkovContextStateKeys.KEYWORDS]: state[
          MarkovContextStateKeys.KEYWORDS
        ].filter((keyword) => keyword !== payload),
      };
    case MarkovContextReducerActionTypes.GENERATE_RESULT:
      return {
        ...state,
        [MarkovContextStateKeys.GENERATED_RESULT]: getMarkovResult({
          maxTries: state[MarkovContextStateKeys.MAX_TRIES],

          // TODO: Add more prngs and index them from dictionary here
          prng: Math.random,
          stateSize: state[MarkovContextStateKeys.STATE_SIZE],
          keywords: state[MarkovContextStateKeys.KEYWORDS],
        }),
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
