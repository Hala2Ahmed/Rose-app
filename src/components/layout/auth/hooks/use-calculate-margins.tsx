import { usePathname } from "@/i18n/navigation";

export default function useCaluclateMargins() {
  const pathname = usePathname();

  //function to change margin top upon route as its differ in figma
  const getMarginTop = () => {
    switch (true) {
      case pathname.includes("/register"):
        return "mt-28";
      default:
        return "mt-20";
    }
  };

  //function to change margin bottom upon route as its differ in figma
  const getMarginBottom = () => {
    switch (true) {
      case pathname.includes("/register"):
        return "mb-28";
      default:
        return "mt-20";
    }
  };

  return {
    getMarginTop,
    getMarginBottom,
  };
}
