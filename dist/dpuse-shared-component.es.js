import { n as e } from "./componentConfig.schema-Csigo0y4.js";
import "./dpuse-shared-locale.es.js";
//#region src/component/index.ts
var t = [
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
function n(e, n = "en") {
	let r = t.find((t) => t.id === e);
	if (r) {
		let e = r.labels[n] ?? r.labels.en ?? r.id;
		return {
			id: r.id,
			color: r.color,
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
export { e as componentConfigSchema, n as getComponentStatus };
