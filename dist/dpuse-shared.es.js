import { d as e, f as t, l as n, o as r, r as i, s as a, t as o } from "./componentConfig.schema-cyVi0ezr.js";
import { t as s } from "./moduleConfig.schema-DsAmxx58.js";
//#region src/component/context/contextConfig.schema.ts
var c = r(["list"]), l = t({
	...o,
	typeId: n("contextModelGroup"),
	modelRefs: a(i),
	order: e()
}), u = t({
	...s,
	typeId: n("context"),
	models: a(l),
	operations: a(c)
}), d = r([
	"list",
	"render",
	"setColorMode"
]), f = t({
	...s,
	typeId: n("presenter"),
	presentations: a(i),
	operations: a(d)
});
//#endregion
export { u as contextConfigSchema, f as presenterConfigSchema };
