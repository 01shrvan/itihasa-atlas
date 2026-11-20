# Itihāsa Atlas design system

## Intent

Itihāsa Atlas is an editorial research instrument, not a mythological theme
park or a software dashboard. A reader should recognise it by its evidence
language: parva names, unresolved questions, source status and consequences.

## Rules inherited from Open Design

- One dominant entry point per screen. Hierarchy comes from scale, whitespace,
  tracking and alignment—not a ladder of bold weights.
- Display typography is Bricolage Grotesque Variable at 480–530 weight, with
  `-0.04em` tracking at editorial sizes. Geist Variable handles body, metadata
  and controls. No third typeface.
- Body copy stays at 60–70 characters per line and 1.55–1.65 leading.
- No gradients, indigo, fake product metrics, emoji controls, stock imagery,
  rounded dashboard tiles or generic feature-list language.
- Each screen gets one accent signal: sage for verified trajectory, rust for
  the point of ethical or political fracture. Do not use both as decoration.
- Use flat fields, one-pixel rules and a few intentional asymmetries. Space is
  preferred to separators; separators only mark a change of reading mode.

## Product routes

- `/` — Atlas: choose an event and trace its pressure through the epic.
- `/verse-lens` — Verse Lens: inspect a verse as Sanskrit, grammar and reading
  note without pretending a draft translation is final.
- `/pathfinder` — Pathfinder: take a small, cited decision route and compare
  its pressures rather than receive a moral score.
- `/protocol` — Protocol: source, attestation and publication practices.

## Accessibility

All interactive controls use semantic buttons or links, have clear labels and
keep keyboard focus visible. Motion respects `prefers-reduced-motion`. Dense
visual maps always have a plain-language supporting docket.
