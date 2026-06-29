import { a as e, c as t, d as n, o as r, r as i } from "./componentConfig.schema-C4pc6MHl.js";
import { t as a } from "./moduleConfig.schema-Cxl5Qw2d.js";
//#region src/component/module/presenter/presenterConfig.schema.ts
var o = e([
	"list",
	"render",
	"setColorMode"
]), s = n({
	typeId: t("presenter"),
	...a,
	actionNames: r(o),
	presentations: r(i)
});
//#endregion
export { s as presenterConfigSchema };
