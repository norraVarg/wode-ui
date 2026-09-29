---
'wode-ui': patch
---

Remove the blocking `changeset-check` CI job. Upstream Changesets guidance recommends against a blocking CI check for missing changesets (it also inherently false-positives on every release commit); the non-blocking Changesets GitHub Bot is the recommended alternative.
