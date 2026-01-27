import ExtractorInput from "./input/ExtractorInput.jsx";
import SummarizerInput from "./input/SummarizerInput.jsx";
import GapInput from "./input/GapInput.jsx";

const STEP_INPUT_COMPONENTS = {
  extractor: ExtractorInput,
  summarizer: SummarizerInput,
  gap: GapInput,
};

export default function InputPanel({ step }) {
  const Component = STEP_INPUT_COMPONENTS[step];
  return <Component />;
}

