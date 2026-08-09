import { c as e, d as t, i as n, o as r, r as i } from "./componentConfig.schema-BRbvCPIW.js";
import { t as a } from "./moduleConfig.schema-DOb6pxQ0.js";
//#region src/component/module/presenter/presenterConfig.schema.ts
var o = n([
	"list",
	"render",
	"setColorMode"
]), s = t({
	...a,
	typeId: e("presenter"),
	actionNames: r(o),
	presentations: r(i)
});
//#endregion
export { s as presenterConfigSchema };
