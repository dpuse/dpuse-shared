import { createLabelMap as e, resolveLabel as t } from "./dpuse-shared-locale.es.js";
import { a as n, c as r, d as i, f as a, i as o, l as s, m as c, o as l, p as u, s as d, u as f } from "./componentConfig.schema-DTtYL9IP.js";
import { t as p } from "./moduleConfig.schema-CMPetJQa.js";
//#region src/component/module/connector/connectorConfig.schema.ts
var m = n([
	"application",
	"curatedDataset",
	"database",
	"fileStore"
]), h = i({ label: o }), g = i({
	authMethodId: n([
		"apiKey",
		"disabled",
		"oAuth2",
		"none"
	]),
	activeConnectionCount: a(f()),
	canDescribe: a(d()),
	id: a(c()),
	label: a(o),
	maxConnectionCount: s(f()),
	params: a(l(u(c(), c())))
}), _ = n([
	"abortOperation",
	"auditObjectContent",
	"createObject",
	"describeConnection",
	"dropObject",
	"findObject",
	"getReadableStream",
	"getRecord",
	"listNodes",
	"previewObject",
	"removeRecords",
	"retrieveChunks",
	"retrieveRecords",
	"upsertRecords"
]), v = i({
	...p,
	typeId: r("connector"),
	category: s(h),
	categoryId: m,
	implementations: u(c(), g),
	operations: l(_),
	vendorAccountURL: s(c()),
	vendorDocumentationURL: s(c()),
	vendorHomeURL: s(c())
}), y = [
	{
		id: "application",
		label: {
			en: "Application",
			es: "Aplicación"
		}
	},
	{
		id: "curatedDataset",
		label: {
			en: "Curated Dataset",
			es: "Conjunto de Datos Curado"
		}
	},
	{
		id: "database",
		label: {
			en: "Database",
			es: "Base de Datos"
		}
	},
	{
		id: "fileStore",
		label: {
			en: "File Store",
			es: "Almacén de Archivos"
		}
	}
], b = (n, r = "en") => {
	let i = y.find((e) => e.id === n);
	return i ? {
		label: t(e(i.label), r) ?? i.id,
		description: []
	} : {
		label: n,
		description: []
	};
};
//#endregion
export { v as connectorConfigSchema, b as constructConnectorCategoryConfig };
