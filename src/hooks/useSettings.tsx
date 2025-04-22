import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

export const useSettings = () => {
  const { settingsState, dispatchSettings } = useContext(SettingsContext);

  return { settingsState, dispatchSettings };
};
