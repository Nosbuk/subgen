import React, { createContext, useReducer, ReactNode } from "react";
import { generateString } from "../features/generateString";

export enum SettingsContextReducerActionTypes {
  SET_MAX_TRIES = "maxTries",
  SET_PRNG = "prng",
  SET_STATE_SIZE = "stateSize",
  ADD_KEYWORDS = "add_keywords",
  REMOVE_KEYWORD = "remove_keyword",
  GENERATE_STRING = "generateString",
}

export enum SettingsContextStateKeys {
  MAX_TRIES = "maxTries",
  PRNG = "prng",
  STATE_SIZE = "stateSize",
  KEYWORDS = "keywords",
  GENERATED_STRING = "generatedString",
}

interface SettingsContextInterface {
  [SettingsContextStateKeys.MAX_TRIES]: number;
  [SettingsContextStateKeys.PRNG]: string;
  [SettingsContextStateKeys.STATE_SIZE]: number;
  [SettingsContextStateKeys.KEYWORDS]: string[];
  [SettingsContextStateKeys.GENERATED_STRING]: string;
}

export enum PRNG {
  MATH_RANDOM = "mathRandom",
  OTHER = "other",
}

export const prngDictionary = {
  [PRNG.MATH_RANDOM]: Math.random,
  [PRNG.OTHER]: Math.random,
};

const defaultSettingsContextValue: SettingsContextInterface = {
  [SettingsContextStateKeys.MAX_TRIES]: 20,
  [SettingsContextStateKeys.PRNG]: PRNG.MATH_RANDOM,
  [SettingsContextStateKeys.STATE_SIZE]: 2,
  [SettingsContextStateKeys.KEYWORDS]: [],
  [SettingsContextStateKeys.GENERATED_STRING]: "",
};

export const SettingsContext = createContext({
  settingsState: defaultSettingsContextValue,

  // TODO: refactor type below
  dispatchSettings: {} as React.ActionDispatch<
    [action: SettingsContextReducerAction]
  >,
});

type SettingsContextReducerAction =
  | { type: SettingsContextReducerActionTypes.SET_MAX_TRIES; payload: number }
  | { type: SettingsContextReducerActionTypes.SET_STATE_SIZE; payload: number }
  | { type: SettingsContextReducerActionTypes.SET_PRNG; payload: string }
  | { type: SettingsContextReducerActionTypes.ADD_KEYWORDS; payload: string[] }
  | { type: SettingsContextReducerActionTypes.REMOVE_KEYWORD; payload: string }
  | {
      type: SettingsContextReducerActionTypes.GENERATE_STRING;
      payload: undefined;
    };

const settingsContextReducer = (
  state: SettingsContextInterface,
  action: SettingsContextReducerAction
) => {
  const { type, payload } = action;

  switch (type) {
    case SettingsContextReducerActionTypes.SET_MAX_TRIES:
      return {
        ...state,
        maxTries: payload,
      };
    case SettingsContextReducerActionTypes.SET_PRNG:
      return {
        ...state,
        prng: payload,
      };
    case SettingsContextReducerActionTypes.SET_STATE_SIZE:
      return {
        ...state,
        stateSize: payload,
      };
    case SettingsContextReducerActionTypes.ADD_KEYWORDS:
      return {
        ...state,
        [SettingsContextStateKeys.KEYWORDS]: [
          ...state[SettingsContextStateKeys.KEYWORDS],
          ...payload.filter((keywords) => keywords !== ""),
        ],
      };
    case SettingsContextReducerActionTypes.REMOVE_KEYWORD:
      return {
        ...state,
        [SettingsContextStateKeys.KEYWORDS]: state[
          SettingsContextStateKeys.KEYWORDS
        ].filter((keyword) => keyword !== payload),
      };
    case SettingsContextReducerActionTypes.GENERATE_STRING:
      return {
        ...state,
        [SettingsContextStateKeys.GENERATED_STRING]: generateString({
          maxTries: state[SettingsContextStateKeys.MAX_TRIES],
          prng: Math.random,
          stateSize: state[SettingsContextStateKeys.STATE_SIZE],
          keywords: state[SettingsContextStateKeys.KEYWORDS],
        }).string,
      };
  }
};

export const SettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [settingsState, dispatchSettings] = useReducer(
    settingsContextReducer,
    defaultSettingsContextValue
  );

  return (
    <SettingsContext.Provider value={{ settingsState, dispatchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
