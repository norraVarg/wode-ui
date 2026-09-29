# wode-ui

## 0.1.1

### Patch Changes

- 88eae12: Remove the blocking `changeset-check` CI job. Upstream Changesets guidance recommends against a blocking CI check for missing changesets (it also inherently false-positives on every release commit); the non-blocking Changesets GitHub Bot is the recommended alternative.

## 0.1.0

### Minor Changes

- 8bd8a6f: Add remaining initial component set: IconButton, Switch, RadioGroup, TextField, Select, Popover, Menu, Spinner, ProgressBar, Toast, Avatar, Badge, Tabs, and Accordion.
- a119b15: Initial component set: light/dark theming via ThemeProvider/useTheme, and Button, Separator, Checkbox, Tooltip, Dialog, and Layout components built on Base UI and Tailwind CSS.

### Patch Changes

- 1a86bc2: Add release workflow: publishes to npm via Changesets and deploys Ladle to GitHub Pages on push to main.
