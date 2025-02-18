import type { ComponentProps, ReactNode } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  loadingText?: string;
  loadingIcon?: ReactNode;
}

function Button({
  children,
  disabled,
  type = "button",
  loadingText,
  loadingIcon = null,
  ref,
  ...props
}: ButtonProps) {
  const isLoading = Boolean(loadingText ?? loadingIcon);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled ?? isLoading}
      aria-disabled={disabled ?? isLoading}
      aria-busy={isLoading}
      aria-label={loadingText && isLoading ? loadingText : undefined}
      {...props}
    >
      {isLoading ? (
        <>
          {loadingIcon} {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
