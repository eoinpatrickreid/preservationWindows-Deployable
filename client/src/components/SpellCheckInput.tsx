// src/components/SpellcheckInput.tsx
import React from "react";
import { Input, InputProps } from "@chakra-ui/react";

const SpellcheckInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ spellCheck = true, ...rest }, ref) => (
    <Input ref={ref} spellCheck={spellCheck} {...rest} />
  )
);

SpellcheckInput.displayName = "SpellcheckInput";

export default SpellcheckInput;
