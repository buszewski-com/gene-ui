import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Props extends ComponentProps<"header"> {
  logo: ReactNode;
  menu: ReactNode;
  menuProps?: ComponentProps<"nav">;
  containerProps?: ComponentProps<"div">;
  mobileMenuHiddenAfter?: number;
  toggleProps?: ComponentProps<"button">;
  onMenuToggle?: (state: boolean) => void;
  mobileMenuItems?: [ReactNode, ReactNode];
}

function AppHeader({
  logo,
  menu,
  containerProps,
  menuProps,
  onMenuToggle,
  toggleProps,
  mobileMenuHiddenAfter = 1200,
  mobileMenuItems = ["open", "close"],
  ...rest
}: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const isMobileViewport = window.matchMedia(
    `(max-width: ${mobileMenuHiddenAfter}px)`,
  ).matches;

  const isMenuVisible = useMemo(() => {
    if (isMobileViewport) {
      return menuVisible;
    }

    return true;
  }, [menuVisible, isMobileViewport]);

  useEffect(() => {
    onMenuToggle?.(isMenuVisible);
  }, [isMenuVisible, onMenuToggle]);

  return (
    <header role="banner" {...rest}>
      <div {...containerProps}>
        {logo}
        <nav
          role="navigation"
          aria-label="Main navigation"
          {...menuProps}
          aria-hidden={!isMenuVisible}
        >
          {menu}
        </nav>
        <button
          onClick={() => setMenuVisible((current) => !current)}
          aria-hidden={!isMobileViewport}
          {...toggleProps}
        >
          {isMenuVisible ? mobileMenuItems[1] : mobileMenuItems[0]}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
