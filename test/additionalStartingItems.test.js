"use strict";

const assert = require("node:assert/strict");

const {
  ADDITIONAL_STARTING_ITEMS,
  BUILDS,
  ITEMS,
} = require("../src");

function isEligibleAdditionalItem(id) {
  const policy = ADDITIONAL_STARTING_ITEMS;
  const item = ITEMS[String(id)];

  if (!Number.isInteger(id)) {
    return false;
  }

  if (
    id < policy.vanillaCollectibleIdRange.min ||
    id > policy.vanillaCollectibleIdRange.max
  ) {
    return false;
  }

  if (!item || item.shown !== true || item.space === true) {
    return false;
  }

  return ![
    ...policy.globallyBannedCollectibleIds,
    ...policy.questProgressionCollectibleIds,
  ].includes(id);
}

function canonicalize(ids, baseBuildIds = []) {
  assert(ids.length <= ADDITIONAL_STARTING_ITEMS.maxAdditionalItems);

  const seen = new Set(baseBuildIds);
  const extras = [];

  for (const id of ids) {
    assert(isEligibleAdditionalItem(id));
    assert(!seen.has(id));
    seen.add(id);
    extras.push(id);
  }

  return extras.sort((a, b) => a - b);
}

function getBuild(name) {
  const build = BUILDS.find((candidate) => candidate.name === name);
  assert(build, `Missing expected build: ${name}`);
  return build;
}

function testPolicyShape() {
  assert.equal(ADDITIONAL_STARTING_ITEMS.version, 1);
  assert.equal(ADDITIONAL_STARTING_ITEMS.maxAdditionalItems, 5);
  assert.equal(ADDITIONAL_STARTING_ITEMS.seededMaxResolvedItems, 4);
  assert.deepEqual(
    ADDITIONAL_STARTING_ITEMS.vanillaCollectibleIdRange,
    { min: 1, max: 732 },
  );
  assert.deepEqual(
    ADDITIONAL_STARTING_ITEMS.globallyBannedCollectibleIds,
    [590, 721],
  );
  assert.deepEqual(
    ADDITIONAL_STARTING_ITEMS.questProgressionCollectibleIds,
    [238, 239, 327, 328, 550, 551, 552, 626, 627, 633, 668],
  );
  assert.equal(ADDITIONAL_STARTING_ITEMS.seededEligibilitySource, "BUILDS");
  assert.equal(ADDITIONAL_STARTING_ITEMS.canonicalOrder, "ascending-id");
  assert.equal(ADDITIONAL_STARTING_ITEMS.rankedSoloSupported, false);
  assert.equal(ADDITIONAL_STARTING_ITEMS.taintedLazarusSupported, false);
}

function testEligibility() {
  assert.equal(isEligibleAdditionalItem(4), true);
  assert.equal(isEligibleAdditionalItem(8), true);

  assert.equal(isEligibleAdditionalItem(33), false);
  assert.equal(isEligibleAdditionalItem(590), false);
  assert.equal(isEligibleAdditionalItem(721), false);
  assert.equal(isEligibleAdditionalItem(238), false);
  assert.equal(isEligibleAdditionalItem(0), false);
  assert.equal(isEligibleAdditionalItem(733), false);
  assert.equal(isEligibleAdditionalItem(1001), false);
}

function testCountLimitsAndDuplicates() {
  assert.deepEqual(canonicalize([]), []);
  assert.deepEqual(canonicalize([4, 12, 8, 50, 67]), [4, 8, 12, 50, 67]);
  assert.throws(() => canonicalize([1, 2, 3, 4, 5, 6]));
  assert.throws(() => canonicalize([4, 4]));
  assert.throws(() => canonicalize([4], [4]));
}

function testSeededCompatibility() {
  const oneItemBuild = getBuild("Cricket's Head");
  const oneItemIds = oneItemBuild.collectibles.map(({ id }) => id);

  assert.equal(
    oneItemIds.length + 3 <= ADDITIONAL_STARTING_ITEMS.seededMaxResolvedItems,
    true,
  );
  assert.equal(
    oneItemIds.length + 4 <= ADDITIONAL_STARTING_ITEMS.seededMaxResolvedItems,
    false,
  );
  assert.throws(() => canonicalize([4], oneItemIds));

  const twoItemBuild = getBuild("20/20 + The Inner Eye");
  assert.equal(
    twoItemBuild.collectibles.length + 2 <=
      ADDITIONAL_STARTING_ITEMS.seededMaxResolvedItems,
    true,
  );
  assert.equal(
    twoItemBuild.collectibles.length + 3 <=
      ADDITIONAL_STARTING_ITEMS.seededMaxResolvedItems,
    false,
  );
}

function testCanonicalOrdering() {
  assert.deepEqual(canonicalize([182, 4, 12]), [4, 12, 182]);
}

testPolicyShape();
testEligibility();
testCountLimitsAndDuplicates();
testSeededCompatibility();
testCanonicalOrdering();

console.log("Additional Starting Items C1 tests passed.");
