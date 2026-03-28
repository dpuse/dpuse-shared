//#region src/locale/index.ts
var e = "en", t = (e) => new Map(Object.entries(e)), n = (e, t, n = "en") => {
	let r = e.get(t);
	if (r !== void 0) return r;
	if (n !== t) return e.get(n);
};
//#endregion
export { e as DEFAULT_LOCALE_CODE, t as createLabelMap, n as resolveLabel };
