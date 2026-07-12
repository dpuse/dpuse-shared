import { createLabelMap as e, resolveLabel as t } from "./dpuse-shared-locale.es.js";
import { a as n, c as r, d as i, f as a, i as o, l as s, m as c, o as l, p as u, s as d, u as f } from "./componentConfig.schema-DzuoA1f0.js";
import { t as p } from "./moduleConfig.schema-COF8ocp_.js";
//#region src/component/module/connector/connectorConfig.schema.ts
var m = n([
	"abortOperation",
	"auditObjectContent",
	"createObject",
	"describeConnection",
	"dropObject",
	"findObject",
	"getInfo",
	"getReadableStream",
	"getRecord",
	"listNodes",
	"previewObject",
	"removeRecords",
	"retrieveChunks",
	"retrieveRecords",
	"upsertRecords"
]), h = n([
	"application",
	"curatedDataset",
	"database",
	"fileStore"
]), g = i({ label: o }), _ = i({
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
}), v = i({
	typeId: r("connector"),
	...p,
	actionNames: l(m),
	category: s(g),
	categoryId: h,
	implementations: u(c(), _),
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
], b = {
	abortOperation: "Abort Operation",
	auditObjectContent: "Audit Object Content",
	createObject: "Create Object",
	describeConnection: "Describe Connection",
	dropObject: "Drop Object",
	findObject: "Find Object",
	getInfo: "Get Info",
	getReadableStream: "Get Readable Stream",
	getRecord: "Get Record",
	listNodes: "List Nodes",
	previewObject: "Preview Object",
	removeRecords: "Remove Records",
	retrieveChunks: "Retrieve Chunks",
	retrieveRecords: "Retrieve Records",
	upsertRecords: "Upsert Records"
}, x = /* @__PURE__ */ new Set([
	"createObject",
	"dropObject",
	"removeRecords",
	"upsertRecords"
]), S = /* @__PURE__ */ new Set([
	"auditObjectContent",
	"findObject",
	"getInfo",
	"getReadableStream",
	"getRecord",
	"listNodes",
	"previewObject",
	"retrieveChunks",
	"retrieveRecords"
]);
function C(e) {
	let t = !1, n = !1;
	for (let r of e) S.has(r) && (t = !0), x.has(r) && (n = !0);
	return t && n ? "bidirectional" : t ? "source" : n ? "destination" : "unknown";
}
var w = (n, r = "en") => {
	let i = y.find((e) => e.id === n);
	return i ? {
		label: t(e(i.label), r) ?? i.id,
		description: []
	} : {
		label: n,
		description: []
	};
};
function T(e) {
	let t = new Set(e), n = "|Action|Supported|\n";
	n += "|:----|:-------:|\n";
	for (let e of Object.keys(b)) n += `| ${b[e]} | ${t.has(e) ? "✓" : ""} |\n`;
	return n;
}
//#endregion
export { b as CONNECTOR_ACTION_NAME_MAP, v as connectorConfigSchema, w as constructConnectorCategoryConfig, C as determineConnectorUsageId, T as getConnectorActionsTable };
