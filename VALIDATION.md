# Validation obligations

The scaffold supplies generic package/release validation and regression fixtures. Add domain-specific tests and regressions.

Capability regressions should prove bounded amendments of healthy authoritative artifacts, deep-path escalation, preservation of unrelated valid artifacts/evidence, targeted invalidation/revalidation, and independent gate ownership. Assert semantic obligations or observable behavior rather than rigid prose sentences unless exact wording is the contract. Adapt these cases to the capability; do not embed provider-specific policy in generic package validation.

Report reusable durable execution/observation evidence, invalidated evidence, freshly established evidence, and assumptions/inferences that are not evidence. Independently inspect reused evidence and rerun affected checks plus mandatory invariants when changes invalidate it. This refinement does not reduce the formal gates below.

Under the simplified archive-integrity contract, `CHECKSUMS.sha256` is not a required source or release artifact. The checksum scripts remain optional maintenance diagnostics, not release gates.

Managed clean-Linux parity is container-engine neutral. `docker` is the default CLI for compatibility; set `WOIA_CONTAINER_ENGINE=podman` (or another Docker-compatible local OCI CLI) to use a zero-cost alternative. Hosted or paid container services are not mandatory.

For current source maintenance and candidate validation, follow [repository maintenance](docs/MAINTENANCE.md).
For release certification and publication, follow [the release procedure](docs/RELEASE.md).

Also run `skills-ref validate` for each skill when available.

No placeholder token or scaffold-only `README.plugin.md` may remain in the release candidate.
