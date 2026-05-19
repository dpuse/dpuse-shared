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
function r(e, t) {
	return {
		...e,
		label: e.label[t] ?? e.id,
		description: e.description[t] ?? e.id,
		verb: e.verb?.[t] ?? void 0
	};
}
function i(e, t) {
	return console.log(111, e, t), e.map((e) => ({
		...e,
		label: e.label[t] ?? e.id,
		description: e.description[t] ?? e.id,
		verb: e.verb?.[t] ?? void 0
	})).toSorted((e, t) => e.label.localeCompare(t.label) || e.id.localeCompare(t.id));
}
function a(e, t, n = "en") {
	let r = e.get(t);
	if (r !== void 0) return r;
	if (n !== t) return e.get(n);
}
//#endregion
export { e as DEFAULT_LOCALE_ID, t as SUPPORTED_LANGUAGES, n as createLabelMap, r as localiseConfig, i as localiseConfigs, a as resolveLabel };
