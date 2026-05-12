import { a as e, c as t, d as n, o as r, r as i } from "./componentConfig.schema-BIilERDi.js";
import { t as a } from "./moduleConfig.schema-ChaMakUL.js";
//#region src/component/module/presenter/presenterConfig.schema.ts
var o = e([
	"list",
	"render",
	"setColorMode"
]), s = n({
	...a,
	typeId: t("presenter"),
	presentations: r(i),
	operations: r(o)
});
//#endregion
export { s as presenterConfigSchema };
