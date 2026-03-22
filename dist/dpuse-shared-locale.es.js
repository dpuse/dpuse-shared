//#region src/locale/index.ts
var e = "en-gb", t = (e) => new Map(Object.entries(e)), n = (t, n, r = e) => {
	let i = t.get(n);
	if (i !== void 0) return i;
	if (r !== n) return t.get(r);
};
//#endregion
export { e as DEFAULT_LOCALE_CODE, t as createLabelMap, n as resolveLabel };
