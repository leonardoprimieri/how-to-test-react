import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "./ui/field";
import { Input } from "./ui/input";
import type { ComponentProps } from "react";

type Props<S> = {
  name: keyof S & string;
  label: string;
} & ComponentProps<typeof Input>;

export function ControlledInput<S>(props: Props<S>) {
  const controlledField = useController({
    name: props.name,
  });

  return (
    <Field data-invalid={controlledField.fieldState.invalid}>
      <FieldLabel htmlFor={controlledField.field.name}>
        {props.label}
      </FieldLabel>
      <Input
        {...props}
        id={controlledField.field.name}
        aria-invalid={controlledField.fieldState.invalid}
        autoComplete="off"
        {...controlledField.field}
      />
      {controlledField.fieldState.invalid && (
        <FieldError errors={[controlledField.fieldState.error]} />
      )}
    </Field>
  );
}
