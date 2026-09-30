# wode-ui

## 0.1.4

### Patch Changes

- 0b5c2c2: Add a test proving `ThemeProvider`'s `'system'` mode actually tracks a live OS color-scheme change, not just its initial value at mount.
- 8d7f1b7: Bump `actions/checkout` and `actions/setup-node` from `v4` to `v7` in `ci.yml` and `release.yml`, clearing GitHub's Node 20 deprecation annotation on every run.
- f0c8577: Add real installation and usage docs to the README: setup steps, the Tailwind class-scanning gotcha for consumers, `ThemeProvider`/`useTheme` usage, and a link to the live component demo.

## 0.1.3

### Patch Changes

- eecd62c: Fix the deployed Ladle workshop on GitHub Pages: set the Ladle `base` path to `/wode-ui/` so built assets resolve under the project's Pages subpath instead of 404ing against the domain root.

## 0.1.2

### Patch Changes

- cf3d9ec: Rewrite the release workflow to build the package before publishing (the previous version silently published an empty `dist/`), and migrate from `changesets/action@v1` to the `@v2` select-mode/version/pack/publish sub-actions — `@v1`'s publish-detection relies on a stdout format `@changesets/cli@3` no longer produces, so it always reported a failed publish even on success.

## 0.1.1

### Patch Changes

- 88eae12: Remove the blocking `changeset-check` CI job. Upstream Changesets guidance recommends against a blocking CI check for missing changesets (it also inherently false-positives on every release commit); the non-blocking Changesets GitHub Bot is the recommended alternative.

## 0.1.0

### Minor Changes

- 8bd8a6f: Add remaining initial component set: IconButton, Switch, RadioGroup, TextField, Select, Popover, Menu, Spinner, ProgressBar, Toast, Avatar, Badge, Tabs, and Accordion.
- a119b15: Initial component set: light/dark theming via ThemeProvider/useTheme, and Button, Separator, Checkbox, Tooltip, Dialog, and Layout components built on Base UI and Tailwind CSS.

### Patch Changes

- 1a86bc2: Add release workflow: publishes to npm via Changesets and deploys Ladle to GitHub Pages on push to main.
