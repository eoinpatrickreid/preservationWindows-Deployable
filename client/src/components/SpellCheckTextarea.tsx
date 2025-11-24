// src/components/SpellcheckTextarea.tsx
import React from "react";
import { Textarea, TextareaProps } from "@chakra-ui/react";

const SpellcheckTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ spellCheck = true, ...rest }, ref) => (
  <Textarea ref={ref} spellCheck={spellCheck} {...rest} />
));

SpellcheckTextarea.displayName = "SpellcheckTextarea";

export default SpellcheckTextarea;
