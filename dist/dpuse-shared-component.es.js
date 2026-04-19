import "./locale-BjiFli1U.js";
import { n as e } from "./componentConfig.schema-Cirbf_EB.js";
//#region src/component/index.ts
var t = [
	{
		id: "alpha",
		color: "red",
		labels: {
			en: "alpha",
			es: "alfa"
		}
	},
	{
		id: "beta",
		color: "amber",
		labels: {
			en: "beta",
			es: "beta"
		}
	},
	{
		id: "generalAvailability",
		color: "green",
		labels: {
			en: "",
			es: ""
		}
	},
	{
		id: "notApplicable",
		color: "green",
		labels: {
			en: "not-applicable",
			es: "no-aplicable"
		}
	},
	{
		id: "preAlpha",
		color: "red",
		labels: {
			en: "pre-alpha",
			es: "pre-alfa"
		}
	},
	{
		id: "proposed",
		color: "other",
		labels: {
			en: "proposed",
			es: "propuesto"
		}
	},
	{
		id: "releaseCandidate",
		color: "green",
		labels: {
			en: "release-candidate",
			es: "candidato-de-lanzamiento"
		}
	},
	{
		id: "unavailable",
		color: "other",
		labels: {
			en: "unavailable",
			es: "no-disponible"
		}
	},
	{
		id: "underReview",
		color: "other",
		labels: {
			en: "under-review",
			es: "en-revisión"
		}
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
