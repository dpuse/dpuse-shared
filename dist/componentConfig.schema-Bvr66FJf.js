import { a as e, d as t, f as n, g as r, h as i, l as a, u as o } from "./locale-CrC0-wPd.js";
//#region src/schema.ts
var s = (e) => r(e.map((e) => a(e))), c = s([
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
]), d = n({
	color: l,
	label: i()
}), f = n({
	id: i(),
	label: e,
	description: e,
	icon: o(i()),
	iconDark: o(i()),
	order: t(),
	path: i()
}), p = {
	id: i(),
	label: e,
	description: e,
	firstCreatedAt: o(t()),
	icon: o(i()),
	iconDark: o(i()),
	lastUpdatedAt: o(t()),
	status: o(d),
	statusId: o(u)
}, m = n({
	...p,
	typeId: c
});
//#endregion
export { s as i, m as n, f as r, p as t };
