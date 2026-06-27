//#region src/utilities/index.ts
var e = [
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
], t = "en-GB", n = /* @__PURE__ */ new Map();
function r(e) {
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
function i(e) {
	if (e) {
		let t = e.lastIndexOf("/") + 1, n = e.lastIndexOf(".");
		return n <= t || n === -1 ? e : e.slice(0, Math.max(0, n));
	}
}
function a(e) {
	if (e) {
		let t = e.lastIndexOf("/") + 1, n = e.lastIndexOf(".");
		if (n <= t) return;
		if (n !== -1) return e.slice(Math.max(0, n + 1));
	}
}
function o(e, r = 2, i = r, a = t) {
	if (e == null) return "";
	let o = `${a}decimal${String(r)}.${String(i)}`, s = n.get(o);
	return s || (s = new Intl.NumberFormat(a, {
		localeMatcher: "best fit",
		maximumFractionDigits: r,
		minimumFractionDigits: i,
		minimumIntegerDigits: 1,
		style: "decimal",
		useGrouping: !0
	}), n.set(o, s)), s.format(e);
}
function s(e, t = 1) {
	return e == null ? "" : e < 1e3 ? u(e) : e < 1e6 ? `${o(e / 1e3, t, 0)}K` : e < 1e9 ? `${o(e / 1e6, t, 0)}M` : e < 0xe8d4a51000 ? `${o(e / 1e9, t, 0)}B` : `${o(e / 0xe8d4a51000, t, 0)}T`;
}
function c(e, t = 1) {
	return e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${u(e)} bytes` : e < 1048576 ? `${o(e / 1024, t, 0)} KB` : e < 1073741824 ? `${o(e / 1048576, t, 0)} MB` : e < 1099511627776 ? `${o(e / 1073741824, t, 0)} GB` : `${o(e / 1099511627776, t, 0)} TB`;
}
function l(t, n = "ms") {
	if (t == null) return "";
	let r = e.findIndex(([e]) => e === n);
	if (t < (e[r]?.[1] ?? 0)) {
		let n = e.find(([, e]) => t >= e);
		if (n == null) return `${u(t)} ms`;
		let [, r, i] = n;
		return i(r > 0 ? Math.floor(t / r) : t);
	}
	let i = [], a = t, o = e.slice(0, r + 1);
	for (let [, e, t] of o) e === 0 ? (a > 0 || i.length === 0) && i.push(t(a)) : a >= e && (i.push(t(Math.floor(a / e))), a %= e);
	return i.join(" ");
}
function u(e, r = t) {
	if (e == null) return "";
	let i = `${r}decimal0.0`, a = n.get(i);
	return a || (a = new Intl.NumberFormat(r, {
		localeMatcher: "best fit",
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
		minimumIntegerDigits: 1,
		style: "decimal",
		useGrouping: !0
	}), n.set(i, a)), a.format(e);
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
export { r as convertODataTypeIdToUsageTypeId, a as extractExtensionFromPath, i as extractNameFromPath, o as formatNumberAsDecimalNumber, l as formatNumberAsDuration, s as formatNumberAsSize, c as formatNumberAsStorageSize, u as formatNumberAsWholeNumber, d as lookupMimeTypeForExtension };
