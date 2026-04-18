import { a as e, c as t, d as n, f as r, h as i, i as a, l as o, m as s, o as c, p as l, r as u, s as d, u as f } from "./locale-CrC0-wPd.js";
import { i as p } from "./componentConfig.schema-CA68ucsw.js";
import { t as m } from "./moduleConfig.schema-CbdmbddJ.js";
//#region src/component/connector/connectorConfig.schema.ts
var h = r({
	authMethodId: p([
		"apiKey",
		"disabled",
		"oAuth2",
		"none"
	]),
	activeConnectionCount: l(n()),
	canDescribe: l(t()),
	id: l(i()),
	label: l(a),
	maxConnectionCount: f(n()),
	params: l(d(s(i(), i())))
}), g = p([
	"application",
	"curatedDataset",
	"database",
	"fileStore"
]), _ = p([
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
]), v = p([
	"bidirectional",
	"destination",
	"source",
	"unknown"
]), y = r({
	id: i(),
	label: e
}), b = r({
	...m,
	typeId: o("connector"),
	category: f(y),
	categoryId: g,
	implementations: s(i(), h),
	operations: d(_),
	usageId: v,
	vendorAccountURL: f(i()),
	vendorDocumentationURL: f(i()),
	vendorHomeURL: f(i())
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
		let e = c(u(n.label), t);
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
