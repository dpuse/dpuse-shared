import "./dpuse-shared-locale.es.js";
import { n as e } from "./componentConfig.schema-BRbvCPIW.js";
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
		id: "releaseCandidate",
		color: "green",
		labels: {
			en: "release-candidate",
			es: "candidato-de-lanzamiento"
		}
	},
	{
		id: "generalAvailability",
		color: "green",
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
		color: "red",
		label: e
	};
}
//#endregion
export { e as componentInstanceConfigSchema, n as getComponentStatus };
