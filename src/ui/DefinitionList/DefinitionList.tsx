import { type ComponentProps, type ReactNode, useState } from "react";

interface DefinitionItem {
  term: ReactNode;
  description: ReactNode;
}

interface Props extends Omit<ComponentProps<"dl">, "children"> {
  items: DefinitionItem[];
  termProps?: ComponentProps<"dt">;
  descriptionProps?: ComponentProps<"dd">;
  activeItem?: number;
}

function DefinitionList({
  items,
  termProps,
  descriptionProps,
  activeItem,
  ...rest
}: Props) {
  const enableToggling = typeof activeItem === "number";
  const [active, setActive] = useState<number | null>(
    enableToggling ? activeItem : null,
  );

  return (
    <dl {...rest}>
      {items.map((item, index) => (
        <div
          key={index}
          className="definition-group"
          data-active={enableToggling && active === index}
          data-clickable={enableToggling ?? undefined}
          onClick={() => {
            if (enableToggling) {
              setActive(active === index ? null : index);
            }
          }}
        >
          <dt {...termProps}>{item.term}</dt>
          <dd
            {...descriptionProps}
            role="definition"
            aria-hidden={enableToggling && active !== index}
          >
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default DefinitionList;
