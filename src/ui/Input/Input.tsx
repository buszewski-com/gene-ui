import type { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  label?: string;
  labelProps?: ComponentProps<"label">;
  description?: string;
  descriptionProps?: ComponentProps<"p">;
  error?: string;
  errorProps?: ComponentProps<"p">;
}

function BaseInput(props: ComponentProps<"input">) {
  return <input {...props} />;
}

function TextComponent(props: ComponentProps<"p">) {
  return <p {...props} />;
}

function Input({
  label,
  labelProps,
  id,
  name,
  description,
  descriptionProps,
  error,
  errorProps,
  "aria-describedby": ariaDescribedby,
  ...rest
}: Props) {
  const inputId = id ?? name;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedby, descriptionId, errorId]
    .filter(Boolean)
    .join(" ");

  const inputProps: ComponentProps<"input"> = {
    ...rest,
    id: inputId,
    name: name,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : undefined,
  };

  if (label) {
    return (
      <div role="group">
        <label {...labelProps} htmlFor={inputId}>
          {label}
        </label>
        <BaseInput {...inputProps} />
        {description && (
          <TextComponent id={descriptionId} {...descriptionProps}>
            {description}
          </TextComponent>
        )}
        {error && (
          <TextComponent role="alert" id={errorId} {...errorProps}>
            {error}
          </TextComponent>
        )}
      </div>
    );
  }

  return <BaseInput {...inputProps} />;
}

export default Input;
