import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("bridge remains a harness adapter over WOIA Core contracts", async()=>{
  const manifest=JSON.parse(await readFile("dev.woia/manifest.json","utf8"));
  assert.equal(manifest.class,"harness-adapter");
  assert.deepEqual(manifest.requires_plugins,[{name:"woia-core",minimum_version:"0.5.0"}]);
  assert.equal(manifest.capabilities[0].effect_class,"communication");
  assert.ok(manifest.contracts.includes("dev.woia.cross-department-request/v1"));
  assert.ok(manifest.contracts.includes("dev.woia.cross-department-response/v1"));
});

test("example sends a shared resource reference instead of a customer record copy", async()=>{
  const request=JSON.parse(await readFile("assets/examples/cross-department-request.json","utf8"));
  assert.equal(request.schema,"dev.woia.cross-department-request/v1");
  assert.equal(request.resource_refs[0].resource_id,"customer:123");
  assert.equal("customer" in request.resource_refs[0],false);
  assert.equal("email" in request.resource_refs[0],false);
});
