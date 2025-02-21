import type { ComponentProps } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props extends Omit<ComponentProps<"select">, "children"> {
  label: string;
  labelProps?: ComponentProps<"label">;
  description?: string;
  error?: string;
  options: SelectOption[];
  wrapperProps?: ComponentProps<"div">;
  errorProps?: ComponentProps<"p">;
  descriptionProps?: ComponentProps<"p">;
}

function Select({
  label,
  labelProps,
  id,
  name,
  description,
  error,
  options,
  wrapperProps,
  errorProps,
  descriptionProps,
  "aria-describedby": ariaDescribedby,
  ...rest
}: Props) {
  const selectId = id ?? name;
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [ariaDescribedby, descriptionId, errorId]
    .filter(Boolean)
    .join(" ");

  const selectProps: ComponentProps<"select"> = {
    ...rest,
    id: selectId,
    name,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : undefined,
  };

  return (
    <div role="group" {...wrapperProps}>
      <label {...labelProps} htmlFor={selectId}>
        {label}
      </label>
      <select {...selectProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export default Select;
