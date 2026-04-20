import { a as e, c as t, d as n, o as r, r as i, t as a, u as o } from "./componentConfig.schema-CpjcH9JV.js";
import { t as s } from "./moduleConfig.schema-DE8ldb7c.js";
//#region src/component/module/context/contextConfig.schema.ts
var c = e(["list"]), l = n({
	...a,
	typeId: t("contextModelGroup"),
	modelRefs: r(i),
	order: o()
}), u = n({
	...s,
	typeId: t("context"),
	models: r(l),
	operations: r(c)
});
//#endregion
export { u as t };
