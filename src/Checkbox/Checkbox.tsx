import type { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<"input">, "type"> {
  label: string;
  labelProps?: ComponentProps<"label">;
  description?: string;
  error?: string;
  wrapperProps?: ComponentProps<"div">;
}

function Checkbox({
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
    type: "checkbox",
    id: inputId,
    name,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : undefined,
  };

  return (
    <div role="group" {...wrapperProps}>
      <input {...inputProps} />
      <label {...labelProps} htmlFor={inputId}>
        {label}
      </label>
      {description && <p id={descriptionId}>{description}</p>}
      {error && (
        <p id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Checkbox;
