---
'wode-ui': patch
---

Rewrite the release workflow to build the package before publishing (the previous version silently published an empty `dist/`), and migrate from `changesets/action@v1` to the `@v2` select-mode/version/pack/publish sub-actions — `@v1`'s publish-detection relies on a stdout format `@changesets/cli@3` no longer produces, so it always reported a failed publish even on success.
