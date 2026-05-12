import { a as e, c as t, d as n, o as r, r as i, t as a, u as o } from "./componentConfig.schema-BIilERDi.js";
import { t as s } from "./moduleConfig.schema-ChaMakUL.js";
//#region src/component/module/context/contextConfig.schema.ts
var c = n({
	...a,
	typeId: t("contextModelGroup"),
	modelRefs: r(i),
	order: o()
}), l = e(["listContextFocuses"]), u = n({
	...s,
	typeId: t("context"),
	models: r(c),
	operations: r(l)
});
//#endregion
export { u as contextConfigSchema };
