import { useCallback } from "react";

interface UseKeyboardNavigationOptions {
  itemCount: number;
  isOpen: boolean;
  onSelect: (index: number) => void;
  onClose: () => void;
  enabled?: boolean;
}

/**
 * Handles arrow key navigation and Enter/Escape for a list of items
 * (e.g. search dropdown). Call with the current highlighted index state.
 */
export function useKeyboardNavigation({
  itemCount,
  isOpen,
  onSelect,
  onClose,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  return {
    onKeyDown: useCallback(
      (
        e: React.KeyboardEvent,
        currentIndex: number,
        setHighlightedIndex: (index: number | ((prev: number) => number)) => void
      ) => {
        if (!enabled || !isOpen) return;

        if (e.key === "Escape") {
          onClose();
          return;
        }

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setHighlightedIndex((prev) =>
            itemCount > 0 ? Math.min(prev + 1, itemCount - 1) : -1
          );
          return;
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          return;
        }

        if (e.key === "Enter" && currentIndex >= 0 && currentIndex < itemCount) {
          e.preventDefault();
          onSelect(currentIndex);
        }
      },
      [enabled, isOpen, itemCount, onSelect, onClose]
    ),
  };
}
