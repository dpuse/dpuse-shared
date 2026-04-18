import { a as e, d as t, f as n, g as r, h as i, l as a, u as o } from "./locale-CrC0-wPd.js";
//#region src/schema.ts
var s = (e) => r(e.map((e) => a(e))), c = s([
	"amber",
	"green",
	"red",
	"other"
]), l = s([
	"alpha",
	"beta",
	"generalAvailability",
	"notApplicable",
	"preAlpha",
	"proposed",
	"releaseCandidate",
	"unavailable",
	"underReview"
]), u = s([
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
]), d = n({
	id: i(),
	color: c,
	label: i()
}), f = {
	id: i(),
	label: e,
	description: e,
	firstCreatedAt: o(t()),
	icon: o(i()),
	iconDark: o(i()),
	lastUpdatedAt: o(t()),
	status: o(d),
	statusId: o(l)
}, p = n({
	...f,
	typeId: u
}), m = n({
	id: i(),
	label: e,
	description: e,
	icon: o(i()),
	iconDark: o(i()),
	order: t(),
	path: i()
});
//#endregion
export { s as i, p as n, m as r, f as t };
