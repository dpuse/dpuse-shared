import { a as e, c as t, d as n, f as r, i, l as a, m as o, o as s, p as c, s as l, u } from "./componentConfig.schema-CpjcH9JV.js";
import { t as d } from "./moduleConfig.schema-DE8ldb7c.js";
import { createLabelMap as f, resolveLabel as p } from "./dpuse-shared-locale.es.js";
//#region src/component/module/connector/connectorConfig.schema.ts
var m = e([
	"application",
	"curatedDataset",
	"database",
	"fileStore"
]), h = n({ label: i }), g = n({
	authMethodId: e([
		"apiKey",
		"disabled",
		"oAuth2",
		"none"
	]),
	activeConnectionCount: r(u()),
	canDescribe: r(l()),
	id: r(o()),
	label: r(i),
	maxConnectionCount: a(u()),
	params: r(s(c(o(), o())))
}), _ = e([
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
]), v = e([
	"bidirectional",
	"destination",
	"source",
	"unknown"
]), y = n({
	...d,
	typeId: t("connector"),
	category: a(h),
	categoryId: m,
	implementations: c(o(), g),
	operations: s(_),
	usageId: v,
	vendorAccountURL: a(o()),
	vendorDocumentationURL: a(o()),
	vendorHomeURL: a(o())
}), b = [
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
], x = (e, t = "en") => {
	let n = b.find((t) => t.id === e);
	return n ? { label: p(f(n.label), t) ?? n.id } : { label: e };
};
//#endregion
export { y as connectorConfigSchema, x as constructConnectorCategoryConfig };
