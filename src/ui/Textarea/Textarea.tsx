import type { ComponentProps } from "react";

interface Props extends ComponentProps<"textarea"> {
  label: string;
  labelProps?: ComponentProps<"label">;
  description?: string;
  error?: string;
  wrapperProps?: ComponentProps<"div">;
  descriptionProps?: ComponentProps<"p">;
  errorProps?: ComponentProps<"p">;
}

function Textarea({
  label,
  labelProps,
  id,
  name,
  description,
  error,
  "aria-describedby": ariaDescribedby,
  wrapperProps,
  descriptionProps,
  errorProps,
  ...rest
}: Props) {
  const textareaId = id ?? name;
  const descriptionId = description ? `${textareaId}-description` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;
  const describedBy = [ariaDescribedby, descriptionId, errorId]
    .filter(Boolean)
    .join(" ");

  const textareaProps: ComponentProps<"textarea"> = {
    ...rest,
    id: textareaId,
    name,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : undefined,
  };

  return (
    <div role="group" {...wrapperProps}>
      <label {...labelProps} htmlFor={textareaId}>
        {label}
      </label>
      <textarea {...textareaProps} />
      {description && (
        <p id={descriptionId} {...descriptionProps}>
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" {...errorProps}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Textarea;
