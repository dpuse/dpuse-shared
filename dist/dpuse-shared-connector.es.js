import { a as e, c as t, d as n, f as r, h as i, i as a, l as o, m as s, o as c, p as l, s as u, u as d } from "./componentConfig.schema-Csigo0y4.js";
import { t as f } from "./moduleConfig.schema-WvtAJjAG.js";
import { DEFAULT_LOCALE_CODE as p, createLabelMap as m, resolveLabel as h } from "./dpuse-shared-locale.es.js";
//#region src/component/connector/connectorConfig.schema.ts
var g = r({
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
}), _ = a([
	"application",
	"curatedDataset",
	"database",
	"fileStore"
]), v = a([
	"abortOperation",
	"auditObjectContent",
	"authenticateConnection",
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
]), y = a([
	"bidirectional",
	"destination",
	"source",
	"unknown"
]), b = r({
	id: i(),
	label: c
}), x = r({
	...f,
	typeId: o("connector"),
	category: d(b),
	categoryId: _,
	implementations: s(i(), g),
	operations: u(v),
	usageId: y,
	vendorAccountURL: d(i()),
	vendorDocumentationURL: d(i()),
	vendorHomeURL: d(i())
}), S = [
	{
		id: "application",
		label: { "en-gb": "Application" }
	},
	{
		id: "curatedDataset",
		label: { "en-gb": "Curated Dataset" }
	},
	{
		id: "database",
		label: { "en-gb": "Database" }
	},
	{
		id: "fileStore",
		label: { "en-gb": "File Store" }
	}
], C = (e, t = p) => {
	let n = S.find((t) => t.id === e);
	if (n) {
		let e = h(m(n.label), t);
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
export { x as connectorConfigSchema, C as constructConnectorCategoryConfig };
