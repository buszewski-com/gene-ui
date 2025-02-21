import type { ComponentProps, ReactNode } from "react";

interface FormProps extends ComponentProps<"form"> {
  legend?: string;
  legendProps?: ComponentProps<"legend">;
  fieldsetProps?: ComponentProps<"fieldset">;
  children: ReactNode;
}

function Form({
  legend,
  legendProps,
  fieldsetProps,
  children,
  ...formProps
}: FormProps) {
  if (legend) {
    return (
      <form {...formProps}>
        <fieldset {...fieldsetProps}>
          <legend {...legendProps}>{legend}</legend>
          {children}
        </fieldset>
      </form>
    );
  }

  return <form {...formProps}>{children}</form>;
}

export default Form;
