import { createLabelMap as e, resolveLabel as t } from "./dpuse-shared-locale.es.js";
import { a as n, c as r, d as i, f as a, i as o, l as s, m as c, o as l, p as u, s as d, u as f } from "./componentConfig.schema-BRbvCPIW.js";
import { t as p } from "./moduleConfig.schema-DOb6pxQ0.js";
//#region src/component/module/connector/connectorConfig.schema.ts
var m = o([
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
]), h = o([
	"application",
	"curatedDataset",
	"database",
	"fileStore"
]), g = i({ label: n }), _ = o([
	"bidirectional",
	"destination",
	"source"
]), v = i({ label: n }), y = o([
	"apiKey",
	"disabled",
	"oAuth2",
	"none"
]), b = i({
	authMethodId: y,
	activeConnectionCount: a(f()),
	canDescribe: a(d()),
	id: a(c()),
	label: a(n),
	maxConnectionCount: s(f()),
	params: a(l(u(c(), c())))
}), x = i({
	...p,
	typeId: r("connector"),
	actionNames: l(m),
	category: s(g),
	categoryId: h,
	implementations: u(c(), b),
	usage: s(v),
	usageId: s(_),
	vendorAccountURL: s(c()),
	vendorDocumentationURL: s(c()),
	vendorHomeURL: s(c())
}), S = [
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
], C = {
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
}, w = [
	{
		id: "bidirectional",
		label: {
			en: "Bidirectional",
			es: "Bidireccional"
		}
	},
	{
		id: "destination",
		label: {
			en: "Destination",
			es: "Destino"
		}
	},
	{
		id: "source",
		label: {
			en: "Source",
			es: "Origen"
		}
	},
	{
		id: "unknown",
		label: {
			en: "Unknown",
			es: "Desconocido"
		}
	}
], T = /* @__PURE__ */ new Set([
	"createObject",
	"dropObject",
	"removeRecords",
	"upsertRecords"
]), E = /* @__PURE__ */ new Set([
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
function D(e) {
	let t = !1, n = !1;
	for (let r of e) E.has(r) && (t = !0), T.has(r) && (n = !0);
	return t && n ? "bidirectional" : t ? "source" : n ? "destination" : "source";
}
var O = (n, r = "en") => {
	let i = S.find((e) => e.id === n);
	if (i) {
		let n = e(i.label);
		return {
			label: t(n, r) ?? i.id,
			description: ""
		};
	}
	return {
		label: n,
		description: ""
	};
}, k = (n, r = "en") => {
	let i = w.find((e) => e.id === n);
	if (i) {
		let n = e(i.label);
		return {
			label: t(n, r) ?? i.id,
			description: ""
		};
	}
	return {
		label: n,
		description: ""
	};
};
function A(e) {
	let t = new Set(e), n = "|Action|Supported|\n";
	n += "|:----|:-------:|\n";
	for (let e of Object.keys(C)) n += `| ${C[e]} | ${t.has(e) ? "✓" : ""} |\n`;
	return n;
}
//#endregion
export { C as CONNECTOR_ACTION_NAME_MAP, x as connectorConfigSchema, O as constructConnectorCategoryConfig, k as constructConnectorUsageConfig, D as determineConnectorUsageId, A as getConnectorActionsTable };
