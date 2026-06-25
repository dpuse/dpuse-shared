//#region src/utilities/index.ts
var e = "en-US", t = /* @__PURE__ */ new Map();
function n(e) {
	switch (e) {
		case "Edm.Binary": return "unknown";
		case "Edm.Boolean": return "boolean";
		case "Edm.Byte": return "wholeNumber";
		case "Edm.DateTime": return "moment";
		case "Edm.DateTimeOffset": return "moment";
		case "Edm.Decimal": return "decimalNumber";
		case "Edm.Double": return "decimalNumber";
		case "Edm.Guid": return "string";
		case "Edm.Int16": return "wholeNumber";
		case "Edm.Int32": return "wholeNumber";
		case "Edm.Int64": return "wholeNumber";
		case "Edm.SByte": return "wholeNumber";
		case "Edm.Single": return "decimalNumber";
		case "Edm.String": return "string";
		case "Edm.Time": return "momentTime";
		default: return "unknown";
	}
}
function r(e) {
	if (e) {
		let t = e.lastIndexOf("/") + 1, n = e.lastIndexOf(".");
		return n <= t || n === -1 ? e : e.slice(0, Math.max(0, n));
	}
}
function i(e) {
	if (e) {
		let t = e.lastIndexOf("/") + 1, n = e.lastIndexOf(".");
		if (n <= t) return;
		if (n !== -1) return e.slice(Math.max(0, n + 1));
	}
}
function a(n, r = 2, i = r, a = e) {
	if (n == null) return "";
	let o = `${a}decimal${String(r)}.${String(i)}`, s = t.get(o);
	return s || (s = new Intl.NumberFormat(a, {
		localeMatcher: "best fit",
		maximumFractionDigits: r,
		minimumFractionDigits: i,
		minimumIntegerDigits: 1,
		style: "decimal",
		useGrouping: !0
	}), t.set(o, s)), s.format(n);
}
function o(e, t = 1) {
	return e == null ? "" : e < 1e3 ? u(e) : e < 1e6 ? `${a(e / 1e3, t, 0)}K` : e < 1e9 ? `${a(e / 1e6, t, 0)}M` : e < 0xe8d4a51000 ? `${a(e / 1e9, t, 0)}B` : `${a(e / 0xe8d4a51000, t, 0)}T`;
}
function s(e, t = 1) {
	return e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${u(e)} bytes` : e < 1048576 ? `${a(e / 1024, t, 0)} KB` : e < 1073741824 ? `${a(e / 1048576, t, 0)} MB` : e < 1099511627776 ? `${a(e / 1073741824, t, 0)} GB` : `${a(e / 1099511627776, t, 0)} TB`;
}
var c = [
	[
		"days",
		864e5,
		(e) => e === 1 ? "1 day" : `${u(e)} days`
	],
	[
		"hrs",
		36e5,
		(e) => e === 1 ? "1 hr" : `${u(e)} hrs`
	],
	[
		"mins",
		6e4,
		(e) => e === 1 ? "1 min" : `${u(e)} mins`
	],
	[
		"secs",
		1e3,
		(e) => e === 1 ? "1 sec" : `${u(e)} secs`
	],
	[
		"ms",
		0,
		(e) => `${u(e)} ms`
	]
];
function l(e, t = "ms") {
	if (e == null) return "";
	let n = c.findIndex(([e]) => e === t);
	if (e < (c[n]?.[1] ?? 0)) {
		let t = c.find(([, t]) => e >= t);
		if (t == null) return `${u(e)} ms`;
		let [, n, r] = t;
		return r(n > 0 ? Math.floor(e / n) : e);
	}
	let r = [], i = e;
	for (let [, e, t] of c.slice(0, n + 1)) e === 0 ? (i > 0 || r.length === 0) && r.push(t(i)) : i >= e && (r.push(t(Math.floor(i / e))), i %= e);
	return r.join(" ");
}
function u(n, r = e) {
	if (n == null) return "";
	let i = `${r}decimal0.0`, a = t.get(i);
	return a || (a = new Intl.NumberFormat(r, {
		localeMatcher: "best fit",
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
		minimumIntegerDigits: 1,
		style: "decimal",
		useGrouping: !0
	}), t.set(i, a)), a.format(n);
}
function d(e) {
	switch (e) {
		case "csv": return "text/csv";
		case "tab":
		case "tsv": return "text/tab-separated-values";
		case "xls": return "application/vnd.ms-excel";
		case "xlsx": return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		default: return "application/octet-stream";
	}
}
//#endregion
export { n as convertODataTypeIdToUsageTypeId, i as extractExtensionFromPath, r as extractNameFromPath, a as formatNumberAsDecimalNumber, l as formatNumberAsDuration, o as formatNumberAsSize, s as formatNumberAsStorageSize, u as formatNumberAsWholeNumber, d as lookupMimeTypeForExtension };
