//#region src/locale/index.ts
var e = "en", t = [{
	id: "en",
	flag: "gb",
	label: "English"
}, {
	id: "es",
	flag: "es",
	label: "Español"
}];
function n(e) {
	return new Map(Object.entries(e));
}
function r(e) {
	return Array.isArray(e) ? e : e == null ? [] : [e];
}
function i(e, t) {
	return {
		...e,
		label: e.label[t] ?? e.id,
		description: r(e.description[t]),
		verb: e.verb?.[t] ?? void 0
	};
}
function a(e, t, n = !1) {
	let i = e.map((e) => ({
		...e,
		label: e.label[t] ?? e.id,
		description: r(e.description[t]),
		verb: e.verb?.[t] ?? void 0
	}));
	return n ? i.toSorted((e, t) => e.label.localeCompare(t.label) || e.id.localeCompare(t.id)) : i;
}
function o(e, t, n = "en") {
	let r = e.get(t);
	if (r !== void 0) return r;
	if (n !== t) return e.get(n);
}
//#endregion
export { e as DEFAULT_LOCALE_ID, t as SUPPORTED_LANGUAGES, n as createLabelMap, i as localiseConfig, a as localiseConfigs, o as resolveLabel };
