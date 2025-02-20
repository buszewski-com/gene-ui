import type { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<"input">, "type"> {
  label: string;
  labelProps?: ComponentProps<"label">;
  wrapperProps?: ComponentProps<"div">;
  description?: string;
  error?: string;
}

function Radio({
  label,
  labelProps,
  id,
  name,
  description,
  error,
  "aria-describedby": ariaDescribedby,
  wrapperProps,
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
    type: "radio",
    id: inputId,
    name,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : undefined,
  };

  return (
    <div role="group" {...wrapperProps}>
      <div className="radio-wrapper">
        <input {...inputProps} />
        <label {...labelProps} htmlFor={inputId}>
          {label}
        </label>
      </div>
      {description && <div id={descriptionId}>{description}</div>}
      {error && (
        <div id={errorId} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default Radio;
