import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const tableOfContentsListItem = style({
  paddingInlineStart: t.space["4"],
});

export const tableOfContentsListItemLink = style({
  ...t.py(2),
  display: "flex",
});
