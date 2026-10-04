# Repository maintenance

This document describes the source-repository authoring environment. It is not a consumer requirement.

Canonical maintenance versions live in `package.json` and are mirrored/verified by Mise.

`pnpm-workspace.yaml` must retain:

~~~yaml
verifyDepsBeforeRun: error
~~~

## Setup

~~~text
mise install
mise run bootstrap
~~~

## Daily validation

~~~text
mise run doctor
mise run ci:fast
~~~

## Portability validation

~~~text
mise run ci:extended
mise run jobs:local
~~~

Docker parity uses a read-only source mount, a fresh Linux workspace, an exact pnpm install and frozen dependencies.

## Portable payload changes

Checksum generation is an optional diagnostic for repositories retaining `CHECKSUMS.sha256`; it is not a release prerequisite.

~~~text
# If retaining the optional checksum manifest:
pnpm run checksums:generate
mise run ci:fast
~~~
