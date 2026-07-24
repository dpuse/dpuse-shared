import { a as e, c as t, d as n, o as r, r as i, t as a, u as o } from "./componentConfig.schema-DzuoA1f0.js";
import { t as s } from "./moduleConfig.schema-COF8ocp_.js";
//#region src/component/context/contextConfig.schema.ts
var c = n({
	typeId: t("contextArea"),
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
