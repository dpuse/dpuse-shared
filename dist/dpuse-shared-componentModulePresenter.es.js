import { a as e, c as t, d as n, o as r, r as i } from "./componentConfig.schema-CqVgZGPq.js";
import { t as a } from "./moduleConfig.schema-vxTWrD6x.js";
//#region src/component/module/presenter/presenterConfig.schema.ts
var o = e([
	"list",
	"render",
	"setColorMode"
]), s = n({
	...a,
	typeId: t("presenter"),
	actionNames: r(o),
	presentations: r(i)
});
//#endregion
export { s as presenterConfigSchema };
