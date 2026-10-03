import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const request = JSON.parse(await readFile("assets/examples/cross-department-request.json", "utf8"));
const response = JSON.parse(await readFile("assets/examples/cross-department-response.json", "utf8"));
const scenarios = JSON.parse(await readFile("assets/acceptance/s4-bridge-host-scenarios.json", "utf8"));
const skill = await readFile("skills/project-bridge/SKILL.md", "utf8");

test("S4 typed handoff keeps correlation and receiver-owned Task identity", () => {
  assert.equal(request.schema, "dev.woia.cross-department-request/v1");
  assert.equal(response.schema, "dev.woia.cross-department-response/v1");
  assert.equal(response.request_id, request.request_id);
  assert.equal(response.correlation_id, request.correlation_id);
  assert.equal(response.receiver.department, request.target_department);
  assert.notEqual(response.receiver.task_ref.id, request.origin.task_ref.id);
  assert.equal(response.receiver.task_ref.kind, "Task");
});

test("S4 bridge carries minimum shared-data references, not copied customer truth", () => {
  const resource = request.resource_refs[0];
  assert.equal(resource.schema, "dev.woia.shared-resource-reference/v1");
  assert.equal(resource.resource_id, "customer:123");
  assert.equal(resource.system_of_record, "customer-data");
  assert.deepEqual(resource.minimum_fields, ["id"]);
  for (const forbidden of ["customer", "email", "phone", "record"]) assert.equal(forbidden in resource, false);
});

test("S4 host scenarios preserve receiver authority and fail closed without native transport", () => {
  const unavailable = scenarios.host_scenarios.find((item) => item.id === "native-transport-unavailable");
  assert.ok(unavailable);
  assert.equal(unavailable.expected_result, "BRIDGE_UNAVAILABLE");
  assert.equal(unavailable.fallback_transport, null);
  assert.equal(unavailable.external_communication_effect, false);
  for (const scenario of scenarios.host_scenarios) {
    assert.equal(scenario.sender_authority_inherited, false, scenario.id);
    assert.equal(scenario.fallback_transport, null, scenario.id);
  }
  assert.match(skill, /BRIDGE_UNAVAILABLE/);
  assert.match(skill, /Do not inherit sender authority/);
  assert.match(skill, /receiving department root orchestrator create its own Task/);
  assert.match(skill, /no substitute external communication effect/);
});

test("S4 response reports receiver output/evidence without mutating sender Task", () => {
  assert.equal(response.status, "completed");
  assert.equal(response.output_refs[0].type, "evidence");
  assert.ok(response.evidence.length > 0);
  assert.equal("origin" in response, false);
  assert.equal("sender_task" in response, false);
});
