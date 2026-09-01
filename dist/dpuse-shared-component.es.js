import "./dpuse-shared-locale.es.js";
import { n as e } from "./componentConfig.schema-BvhUd4m4.js";
//#region src/component/index.ts
var t = [
	{
		id: "alpha",
		color: "danger",
		labels: {
			en: "alpha",
			es: "alfa"
		}
	},
	{
		id: "beta",
		color: "warning",
		labels: {
			en: "beta",
			es: "beta"
		}
	},
	{
		id: "releaseCandidate",
		color: "success",
		labels: {
			en: "release-candidate",
			es: "candidato-de-lanzamiento"
		}
	},
	{
		id: "generalAvailability",
		color: "success",
		labels: {
			en: "",
			es: ""
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
		color: "danger",
		label: e
	};
}
//#endregion
export { e as componentInstanceConfigSchema, n as getComponentStatus };
