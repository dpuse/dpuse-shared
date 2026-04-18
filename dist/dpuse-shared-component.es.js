import "./locale-CrC0-wPd.js";
import { n as e } from "./componentConfig.schema-Bvr66FJf.js";
//#region src/component/index.ts
var t = [
	{
		id: "alpha",
		color: "red",
		labels: { en: "alpha" }
	},
	{
		id: "beta",
		color: "amber",
		labels: { en: "beta" }
	},
	{
		id: "generalAvailability",
		color: "green",
		labels: { en: "" }
	},
	{
		id: "notApplicable",
		color: "green",
		labels: { en: "not-applicable" }
	},
	{
		id: "preAlpha",
		color: "red",
		labels: { en: "pre-alpha" }
	},
	{
		id: "proposed",
		color: "other",
		labels: { en: "proposed" }
	},
	{
		id: "releaseCandidate",
		color: "green",
		labels: { en: "release-candidate" }
	},
	{
		id: "unavailable",
		color: "other",
		labels: { en: "unavailable" }
	},
	{
		id: "underReview",
		color: "other",
		labels: { en: "under-review" }
	}
];
function n(e, n = "en") {
	let r = t.find((t) => t.id === e);
	if (r) {
		let e = r.labels[n] ?? r.labels.en ?? r.id;
		return {
			color: r.color,
			label: e
		};
	}
	return {
		color: "other",
		label: e
	};
}
//#endregion
export { e as componentConfigSchema, n as getComponentStatus };
