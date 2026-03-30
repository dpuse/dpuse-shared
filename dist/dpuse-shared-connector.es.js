import { a as e, c as t, d as n, f as r, h as i, i as a, l as o, m as s, o as c, p as l, s as u, u as d } from "./componentConfig.schema-B6kdXy8u.js";
import { t as f } from "./moduleConfig.schema-DPEkEXqp.js";
import { createLabelMap as p, resolveLabel as m } from "./dpuse-shared-locale.es.js";
//#region src/component/connector/connectorConfig.schema.ts
var h = r({
	authMethodId: a([
		"apiKey",
		"disabled",
		"oAuth2",
		"none"
	]),
	activeConnectionCount: l(n()),
	canDescribe: l(t()),
	id: l(i()),
	label: l(e),
	maxConnectionCount: d(n()),
	params: l(u(s(i(), i())))
}), g = a([
	"application",
	"curatedDataset",
	"database",
	"fileStore"
]), _ = a([
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
]), v = a([
	"bidirectional",
	"destination",
	"source",
	"unknown"
]), y = r({
	id: i(),
	label: c
}), b = r({
	...f,
	typeId: o("connector"),
	category: d(y),
	categoryId: g,
	implementations: s(i(), h),
	operations: u(_),
	usageId: v,
	vendorAccountURL: d(i()),
	vendorDocumentationURL: d(i()),
	vendorHomeURL: d(i())
}), x = [
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
], S = (e, t = "en") => {
	let n = x.find((t) => t.id === e);
	if (n) {
		let e = m(p(n.label), t);
		return {
			id: n.id,
			label: e ?? n.id
		};
	}
	return {
		id: e,
		label: e
	};
};
//#endregion
export { b as connectorConfigSchema, S as constructConnectorCategoryConfig };
