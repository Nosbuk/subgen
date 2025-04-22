import { SettingsContextStateKeys } from "../../contexts/SettingsContext";
import { useSettings } from "../../hooks/useSettings";

export const MarkovOutput = () => {
  const { settingsState } = useSettings();

  const generatedString =
    settingsState[SettingsContextStateKeys.GENERATED_STRING];
  const isGeneratedStringNotEmpty = generatedString.length > 0;
  return (
    <div>
      {isGeneratedStringNotEmpty
        ? generatedString
        : "Click GENERATE below to create subject line"}
    </div>
  );
};
