import { i as e, n as t, r as n, t as r } from "./label-DexpXrnC.js";
//#region src/locale/index.ts
function i(e, t) {
	return {
		...e,
		label: e.label[t] ?? e.id,
		description: e.description[t] ?? e.description.en ?? "",
		verb: e.verb?.[t] ?? void 0
	};
}
function a(e, t, n = !1) {
	let r = e.map((e) => ({
		...e,
		label: e.label[t] ?? e.id,
		description: e.description[t] ?? e.description.en ?? "",
		verb: e.verb?.[t] ?? void 0
	}));
	return n ? r.toSorted((e, t) => e.label.localeCompare(t.label) || e.id.localeCompare(t.id)) : r;
}
function o(e, t) {
	return {
		...e,
		label: e.label[t] ?? e.id,
		description: e.description[t] ?? e.description.en ?? ""
	};
}
//#endregion
export { r as DEFAULT_LOCALE_ID, t as SUPPORTED_LANGUAGES, n as createLabelMap, i as localiseConfig, a as localiseConfigs, o as localiseReference, e as resolveLabel };
