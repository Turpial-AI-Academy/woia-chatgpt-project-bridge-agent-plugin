# WOIA ChatGPT Project Bridge

Portable WOIA adapter for interdepartment communication between ChatGPT/Codex Projects.

The canonical protocol lives in WOIA Core as dev.woia.cross-department-request/v1 and dev.woia.cross-department-response/v1. This plugin maps that protocol onto the host's native Project-to-Project task/message capability.

## Boundary

- The sender requests an outcome/capability, not direct control of the receiver.
- The receiver's root orchestrator creates/owns its own Task and chooses its own methodology/providers.
- Shared organizational records travel as references whenever possible, not duplicated payloads.
- The bridge does not grant authority; the receiving Project evaluates its own authority context.
- If the current host cannot expose a native Project messaging/task primitive, the bridge returns BRIDGE_UNAVAILABLE rather than inventing another transport.

## Dependency

woia-core >= 0.5.6

## Maintenance

Edit only this canonical repository. Keep `plugin.json`, `package.json` and `dev.woia/manifest.json` versions aligned. From the canonical WOIA Ecosystem repository, run `mise run plugin:certify-thin --repo <absolute-plugin-repository>`, then use its release preparation/publication tasks. Install and update consumers from immutable published artifacts; keep Project personalization in overlays.
