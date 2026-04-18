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
function r(e, t, n = "en") {
	let r = e.get(t);
	if (r !== void 0) return r;
	if (n !== t) return e.get(n);
}
//#endregion
export { e as DEFAULT_LOCALE_ID, t as SUPPORTED_LANGUAGES, n as createLabelMap, r as resolveLabel };
