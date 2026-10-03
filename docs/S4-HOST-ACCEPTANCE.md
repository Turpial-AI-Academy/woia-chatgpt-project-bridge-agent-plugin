# S4 Project Bridge host acceptance

Status: **READY FOR HOST EXECUTION, NOT YET EXECUTED**.

Deterministic source fixtures live in `assets/examples/`, `assets/acceptance/s4-bridge-host-scenarios.json`, and `tests/s4-acceptance.test.mjs`.

## 1. Native Project transport available

1. From a WOIA-managed Marketing Project, build the canonical request fixture using a real origin Task.
2. Dispatch it through the host's native Project-to-Project task/message primitive to a WOIA-managed Sales Project.
3. Verify the Sales root orchestrator creates a distinct receiver-owned Task with `origin=cross-department-request`.
4. Return a canonical response using the same request/correlation IDs and the receiver Task reference.

Expected: transport success is recorded as a communication effect; the receiver owns methodology/providers/authority; completion is proven only by the typed response/evidence.

## 2. Native Project transport unavailable

1. Execute the same bridge request where the host exposes no supported Project-to-Project primitive.
2. Verify the bridge returns `BRIDGE_UNAVAILABLE`.
3. Verify no email, Slack, generic API, or other substitute communication is attempted.

Expected: fail closed with no external communication side effect.

## 3. Authority isolation

Send a request whose sender has authority for a Marketing action but not the requested Sales effect.

Expected: the receiving Sales Project resolves and evaluates its own authority context; sender authority is never inherited from the message or transport.

## 4. Shared-data minimum movement

Use a customer record that exists in the shared system of record.

Expected: the message carries only the shared resource reference/minimum routing fields needed by the receiver. Customer truth is resolved from the authorized source rather than duplicated into the bridge payload.
