import { type ElementType, type HTMLProps } from "react";
import clsx from "clsx";

import styles from "./Grid.module.css";

interface Props<T extends ElementType> extends HTMLProps<T> {
  tag?: T;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gaps?: {
    xs?: number | string;
    sm?: number | string;
    md?: number | string;
    lg?: number | string;
    xl?: number | string;
  };
  role?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

type Formatter = (input: string | number | undefined) => string | number;

const formatGap: Formatter = (value: string | number | undefined) => {
  if (typeof value === "string") return value;
  return value ? `${value}rem` : "0";
};

function resolveColumnsAndRows(
  columns: Props<"div">["columns"],
  gaps: Props<"div">["gaps"],
  formatter: Formatter = formatGap,
) {
  return {
    ["--columns-xs" as string]: columns?.xs ?? 4,
    ["--columns-sm" as string]: columns?.sm ?? columns?.xs ?? 6,
    ["--columns-md" as string]: columns?.md ?? columns?.sm ?? columns?.xs ?? 12,
    ["--columns-lg" as string]:
      columns?.lg ?? columns?.md ?? columns?.sm ?? columns?.xs ?? 12,
    ["--columns-xl" as string]:
      columns?.xl ??
      columns?.lg ??
      columns?.md ??
      columns?.sm ??
      columns?.xs ??
      12,

    ["--gap-xs" as string]: formatter(gaps?.xs),
    ["--gap-sm" as string]: formatter(gaps?.sm ?? gaps?.xs),
    ["--gap-md" as string]: formatter(gaps?.md ?? gaps?.sm ?? gaps?.xs),
    ["--gap-lg" as string]: formatter(
      gaps?.lg ?? gaps?.md ?? gaps?.sm ?? gaps?.xs,
    ),
    ["--gap-xl" as string]: formatter(
      gaps?.xl ?? gaps?.lg ?? gaps?.md ?? gaps?.sm ?? gaps?.xs,
    ),
  };
}

function Grid<T extends ElementType = "p">({
  tag,
  columns,
  gaps,
  role = "grid",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  className,
  style,
  ...rest
}: Props<T>) {
  const Component: ElementType = tag ?? "div";

  if (tag === "header" || tag === "footer" || tag === "nav") {
    console.warn(
      `Using ${String(tag)} as a grid container might not be semantically correct, Consider reverting to div, article or section.`,
    );
  }

  return (
    <Component
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      style={{
        ...resolveColumnsAndRows(columns, gaps),
        ...style,
      }}
      className={clsx(styles.grid, className)}
      {...rest}
    />
  );
}

export default Grid;
