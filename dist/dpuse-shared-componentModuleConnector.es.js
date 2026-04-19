import { c as e, d as t, f as n, g as r, h as i, i as a, l as o, m as s, p as c, r as l, s as u, u as d } from "./locale-BjiFli1U.js";
import { i as f } from "./componentConfig.schema-Cirbf_EB.js";
import { t as p } from "./moduleConfig.schema-DTqGQW05.js";
//#region src/component/module/connector/connectorConfig.schema.ts
var m = f([
	"application",
	"curatedDataset",
	"database",
	"fileStore"
]), h = c({ label: a }), g = c({
	authMethodId: f([
		"apiKey",
		"disabled",
		"oAuth2",
		"none"
	]),
	activeConnectionCount: s(n()),
	canDescribe: s(o()),
	id: s(r()),
	label: s(a),
	maxConnectionCount: t(n()),
	params: s(e(i(r(), r())))
}), _ = f([
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
]), v = f([
	"bidirectional",
	"destination",
	"source",
	"unknown"
]), y = c({
	...p,
	typeId: d("connector"),
	category: t(h),
	categoryId: m,
	implementations: i(r(), g),
	operations: e(_),
	usageId: v,
	vendorAccountURL: t(r()),
	vendorDocumentationURL: t(r()),
	vendorHomeURL: t(r())
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
	return n ? { label: u(l(n.label), t) ?? n.id } : { label: e };
};
//#endregion
export { y as connectorConfigSchema, x as constructConnectorCategoryConfig };
