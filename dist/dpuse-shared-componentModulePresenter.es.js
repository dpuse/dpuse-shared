import { a as e, c as t, d as n, o as r, r as i } from "./componentConfig.schema-B7kVKqVP.js";
import { t as a } from "./moduleConfig.schema-Cvc9QRvr.js";
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
