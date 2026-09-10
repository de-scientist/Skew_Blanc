import { describe, expect, it } from "vitest";
import { bottomNavItems, navGroups } from "@/config/nav";

/**
 * Sidebar / MobileBottomNav key their list items by `item.label`, so labels
 * must be unique within each rendered list. (Keys cannot use `item.href`:
 * "Study Notes" and "Flashcards" intentionally share the `/study-notes`
 * hub, which previously produced React's "two children with the same key"
 * console error.)
 */
describe("nav list keys", () => {
  it("uses a unique label per item within each sidebar group", () => {
    for (const group of navGroups) {
      const labels = group.items.map((i) => i.label);
      expect(new Set(labels).size, `group "${group.label}"`).toBe(
        labels.length
      );
    }
  });

  it("uses a unique label per mobile bottom-nav item", () => {
    const labels = bottomNavItems.map((i) => i.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
