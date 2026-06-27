import { a as e, c as t, d as n, o as r, r as i, t as a, u as o } from "./componentConfig.schema-B7kVKqVP.js";
import { t as s } from "./moduleConfig.schema-Cvc9QRvr.js";
//#region src/component/module/context/contextConfig.schema.ts
var c = n({
	typeId: t("contextModelGroup"),
	...a,
	modelRefs: r(i),
	order: o()
}), l = e(["listContextFocuses"]), u = n({
	typeId: t("context"),
	...s,
	actionNames: r(l),
	models: r(c)
});
//#endregion
export { u as contextConfigSchema };
