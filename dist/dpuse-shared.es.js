import { d as e, f as t, i as n, l as r, r as i, s as a, t as o } from "./componentConfig.schema-Csigo0y4.js";
import { t as s } from "./moduleConfig.schema-WvtAJjAG.js";
//#region src/component/context/contextConfig.schema.ts
var c = n(["list"]), l = t({
	...o,
	typeId: r("contextModelGroup"),
	modelRefs: a(i),
	order: e()
}), u = t({
	...s,
	typeId: r("context"),
	models: a(l),
	operations: a(c)
}), d = n([
	"list",
	"render",
	"setColorMode"
]), f = t({
	...s,
	typeId: r("presenter"),
	presentations: a(i),
	operations: a(d)
});
//#endregion
export { u as contextConfigSchema, f as presenterConfigSchema };
