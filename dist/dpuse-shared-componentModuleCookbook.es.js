import { a as e, c as t, d as n, o as r, r as i } from "./componentConfig.schema-CqVgZGPq.js";
import { t as a } from "./moduleConfig.schema-CXWl_g98.js";
//#region src/component/module/cookbook/cookbookConfig.schema.ts
var o = e(["list"]), s = n({
	typeId: t("cookbook"),
	...a,
	actionNames: r(o),
	recipes: r(i)
});
//#endregion
export { s as cookbookConfigSchema };
