import { c as e, d as t, f as n, h as r, i, l as a, m as o, o as s, p as c, r as l, s as u, u as d } from "./locale-CrC0-wPd.js";
import { i as f } from "./componentConfig.schema-Bvr66FJf.js";
import { t as p } from "./moduleConfig.schema-Ct8Q53dE.js";
//#region src/component/module/connector/connectorConfig.schema.ts
var m = f([
	"application",
	"curatedDataset",
	"database",
	"fileStore"
]), h = n({ label: i }), g = n({
	authMethodId: f([
		"apiKey",
		"disabled",
		"oAuth2",
		"none"
	]),
	activeConnectionCount: c(t()),
	canDescribe: c(e()),
	id: c(r()),
	label: c(i),
	maxConnectionCount: d(t()),
	params: c(u(o(r(), r())))
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
]), y = n({
	...p,
	typeId: a("connector"),
	category: d(h),
	categoryId: m,
	implementations: o(r(), g),
	operations: u(_),
	usageId: v,
	vendorAccountURL: d(r()),
	vendorDocumentationURL: d(r()),
	vendorHomeURL: d(r())
}), b = [
	{
		id: "application",
		label: { en: "Application" }
	},
	{
		id: "curatedDataset",
		label: { en: "Curated Dataset" }
	},
	{
		id: "database",
		label: { en: "Database" }
	},
	{
		id: "fileStore",
		label: { en: "File Store" }
	}
], x = (e, t = "en") => {
	let n = b.find((t) => t.id === e);
	return n ? { label: s(l(n.label), t) ?? n.id } : { label: e };
};
//#endregion
export { y as connectorConfigSchema, x as constructConnectorCategoryConfig };
