import { i as e, r as t } from "./label-DexpXrnC.js";
import { a as n, c as r, d as i, f as a, i as o, l as s, m as c, o as l, p as u, s as d, u as f } from "./componentConfig.schema-Dxqinpxy.js";
import { t as p } from "./moduleConfig.schema-B_EBeUaj.js";
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
]), b = u(c(), c()), x = i({
	authMethodId: y,
	activeConnectionCount: a(f()),
	canDescribe: a(d()),
	id: a(c()),
	label: a(n),
	maxConnectionCount: s(f()),
	params: a(l(b))
}), S = i({
	...p,
	typeId: r("connector"),
	actionNames: l(m),
	category: s(g),
	categoryId: h,
	implementations: u(c(), x),
	usage: s(v),
	usageId: s(_)
}), C = [
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
], w = {
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
}, T = [
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
], E = /* @__PURE__ */ new Set([
	"createObject",
	"dropObject",
	"removeRecords",
	"upsertRecords"
]), D = /* @__PURE__ */ new Set([
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
function O(e) {
	let t = !1, n = !1;
	for (let r of e) D.has(r) && (t = !0), E.has(r) && (n = !0);
	return t && n ? "bidirectional" : t ? "source" : n ? "destination" : "source";
}
var k = (n, r = "en") => {
	let i = C.find((e) => e.id === n);
	if (i) {
		let n = t(i.label);
		return {
			label: e(n, r) ?? i.id,
			description: ""
		};
	}
	return {
		label: n,
		description: ""
	};
}, A = (n, r = "en") => {
	let i = T.find((e) => e.id === n);
	if (i) {
		let n = t(i.label);
		return {
			label: e(n, r) ?? i.id,
			description: ""
		};
	}
	return {
		label: n,
		description: ""
	};
};
function j(e) {
	let t = new Set(e), n = "|Action|Supported|\n";
	n += "|:----|:-------:|\n";
	for (let e of Object.keys(w)) n += `| ${w[e]} | ${t.has(e) ? "✓" : ""} |\n`;
	return n;
}
//#endregion
export { w as CONNECTOR_ACTION_NAME_MAP, S as connectorConfigSchema, k as constructConnectorCategoryConfig, A as constructConnectorUsageConfig, O as determineConnectorUsageId, j as getConnectorActionsTable };
