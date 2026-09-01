import { d as e, i as t, l as n, m as r, t as i } from "./componentConfig.schema-BvhUd4m4.js";
//#region src/component/module/moduleConfig.schema.ts
var a = t([
	"app",
	"engine",
	"connector",
	"cookbook",
	"presenter",
	"tool"
]), o = {
	...i,
	vendorAccountURL: n(r()),
	vendorDocumentationURL: n(r()),
	vendorHomeURL: n(r()),
	version: r()
};
e({
	...o,
	typeId: a
});
//#endregion
export { o as t };
