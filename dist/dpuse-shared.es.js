import { d as e, f as t, l as n, s as r } from "./locale-CrC0-wPd.js";
import { i, r as a, t as o } from "./componentConfig.schema-Dvc1hymu.js";
import { t as s } from "./moduleConfig.schema-B_KmEec4.js";
//#region src/component/context/contextConfig.schema.ts
var c = i(["list"]), l = t({
	...o,
	typeId: n("contextModelGroup"),
	modelRefs: r(a),
	order: e()
}), u = t({
	...s,
	typeId: n("context"),
	models: r(l),
	operations: r(c)
}), d = i([
	"list",
	"render",
	"setColorMode"
]), f = t({
	...s,
	typeId: n("presenter"),
	presentations: r(a),
	operations: r(d)
});
//#endregion
export { u as contextConfigSchema, f as presenterConfigSchema };
