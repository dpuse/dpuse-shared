//#region src/locale/label.ts
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
	return r === void 0 ? n === t ? void 0 : e.get(n) : r;
}
//#endregion
export { r as i, t as n, n as r, e as t };
