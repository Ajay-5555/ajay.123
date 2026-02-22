const $ = (id) => document.getElementById(id);

function toTypedValue(raw, type) {
  switch (type) {
    case "string":
      return raw;
    case "number":
      return Number(raw);
    case "boolean": {
      const normalized = raw.trim().toLowerCase();
      if (["true", "1", "yes"].includes(normalized)) return true;
      if (["false", "0", "no", ""].includes(normalized)) return false;
      return Boolean(raw);
    }
    case "null":
      return null;
    case "undefined":
      return undefined;
    case "bigint":
      return BigInt(raw || "0");
    default:
      return raw;
  }
}

function safeCompare(fn) {
  try {
    return String(fn());
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

function buildSummary(value) {
  const rows = [
    ["Value", String(value)],
    ["typeof", typeof value],
    ["Number(value)", String(Number(value))],
    ["String(value)", String(String(value))],
    ["Boolean(value)", String(Boolean(value))],
    ["isNaN(Number(value))", String(Number.isNaN(Number(value)))],
  ];

  return `<div class="table">${rows
    .map(([k, v]) => `<div class="row"><div>${k}</div><div>${v}</div></div>`)
    .join("")}</div>`;
}

function buildComparison(a, b) {
  const rows = [
    ["A == B", safeCompare(() => a == b)],
    ["A === B", safeCompare(() => a === b)],
    ["A > B", safeCompare(() => a > b)],
    ["A >= B", safeCompare(() => a >= b)],
    ["A < B", safeCompare(() => a < b)],
    ["A <= B", safeCompare(() => a <= b)],
  ];

  return `<div class="table">${rows
    .map(([k, v]) => `<div class="row"><div>${k}</div><div>${v}</div></div>`)
    .join("")}</div>`;
}

function analyze() {
  const rawA = $("valueA").value;
  const rawB = $("valueB").value;
  const typeA = $("typeA").value;
  const typeB = $("typeB").value;

  try {
    const valueA = toTypedValue(rawA, typeA);
    const valueB = toTypedValue(rawB, typeB);

    $("summary").innerHTML = buildSummary(valueA);
    $("comparison").innerHTML = buildComparison(valueA, valueB);
  } catch (error) {
    $("summary").innerHTML = `<p class="error">${error.message}</p>`;
    $("comparison").innerHTML = `<p class="error">Fix input and try again.</p>`;
  }
}

$("analyzeBtn").addEventListener("click", analyze);
document.addEventListener("DOMContentLoaded", analyze);