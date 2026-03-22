import { n as e } from "./componentConfig.schema-Csigo0y4.js";
import { DEFAULT_LOCALE_CODE as t } from "./dpuse-shared-locale.es.js";
//#region src/component/index.ts
var n = [
	{
		id: "alpha",
		color: "red",
		labels: { "en-gb": "alpha" }
	},
	{
		id: "beta",
		color: "amber",
		labels: { "en-gb": "beta" }
	},
	{
		id: "generalAvailability",
		color: "green",
		labels: { "en-gb": "" }
	},
	{
		id: "notApplicable",
		color: "green",
		labels: { "en-gb": "not-applicable" }
	},
	{
		id: "preAlpha",
		color: "red",
		labels: { "en-gb": "pre-alpha" }
	},
	{
		id: "proposed",
		color: "other",
		labels: { "en-gb": "proposed" }
	},
	{
		id: "releaseCandidate",
		color: "green",
		labels: { "en-gb": "release-candidate" }
	},
	{
		id: "unavailable",
		color: "other",
		labels: { "en-gb": "unavailable" }
	},
	{
		id: "underReview",
		color: "other",
		labels: { "en-gb": "under-review" }
	}
];
function r(e, r = t) {
	let i = n.find((t) => t.id === e);
	if (i) {
		let e = i.labels[r] ?? i.labels["en-gb"] ?? i.id;
		return {
			id: i.id,
			color: i.color,
			label: e
		};
	}
	return {
		id: e,
		color: "other",
		label: e
	};
}
//#endregion
export { e as componentConfigSchema, r as getComponentStatus };
