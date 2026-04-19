import { _ as e, d as t, f as n, g as r, o as i, p as a, u as o } from "./locale-BjiFli1U.js";
//#region src/schema.ts
var s = (t) => e(t.map((e) => o(e))), c = s([
	"app",
	"connector",
	"connectorConnection",
	"context",
	"contextModelGroup",
	"contextModel",
	"contextModelDimensionGroup",
	"contextModelDimension",
	"contextModelDimensionHierarchy",
	"contextModelEntityGroup",
	"contextModelEntity",
	"contextModelEntityDataItem",
	"contextModelEntityEvent",
	"contextModelEntityPrimaryMeasure",
	"contextModelSecondaryMeasureGroup",
	"contextModelSecondaryMeasure",
	"dataView",
	"dimension",
	"engine",
	"eventQuery",
	"presenter",
	"presenterPresentation",
	"tool"
]), l = s([
	"amber",
	"green",
	"red",
	"other"
]), u = s([
	"alpha",
	"beta",
	"generalAvailability",
	"notApplicable",
	"preAlpha",
	"proposed",
	"releaseCandidate",
	"unavailable",
	"underReview"
]), d = a({
	color: l,
	label: r()
}), f = a({
	id: r(),
	label: i,
	description: i,
	icon: t(r()),
	iconDark: t(r()),
	order: n(),
	path: r()
}), p = {
	id: r(),
	label: i,
	description: i,
	firstCreatedAt: t(n()),
	icon: t(r()),
	iconDark: t(r()),
	lastUpdatedAt: t(n()),
	status: t(d),
	statusId: t(u)
}, m = a({
	...p,
	typeId: c
});
//#endregion
export { s as i, m as n, f as r, p as t };
