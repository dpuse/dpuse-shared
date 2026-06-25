//#region src/errors/index.ts
var e = 2048, t = class extends Error {
	data;
	locator;
	constructor(e, t, n, r) {
		super(e, r), this.name = "DPUseError", this.data = n, this.locator = t;
	}
}, n = class extends t {
	constructor(e, t, n, r) {
		super(e, t, n, r), this.name = "AppError";
	}
}, r = class extends t {
	constructor(e, t, n, r) {
		super(e, t, n, r), this.name = "APIError";
	}
}, i = class extends t {
	constructor(e, t, n, r) {
		super(e, t, n, r), this.name = "EngineError";
	}
}, a = class extends t {
	constructor(e, t, n, r) {
		super(e, t, n, r), this.name = "ConnectorError";
	}
}, o = class extends t {
	constructor(e, t, n, r) {
		super(e, t, n, r), this.name = "FetchError";
	}
};
async function s(e, t, n) {
	let r = ` - ${e.statusText}`, i = `${t} Response status '${String(e.status)}${e.statusText ? r : ""}' received.`, a;
	try {
		a = await e.text();
	} catch (e) {
		a = `<body unavailable: ${u(e).message}>`;
	}
	return new o(i, n, { body: h(a) });
}
function c(e) {
	return e.map((e) => e.message).join(" ");
}
function l(e) {
	try {
		e();
	} catch {}
}
function u(e) {
	if (e instanceof Error) return e;
	if (typeof e == "string") return Error(e);
	if (typeof e == "number" || typeof e == "boolean" || typeof e == "bigint") return Error(String(e));
	if (typeof e == "symbol") return Error(e.description ?? "Unknown error");
	if (typeof e == "object") try {
		return Error(JSON.stringify(e));
	} catch {
		return /* @__PURE__ */ Error("Unknown error");
	}
	return /* @__PURE__ */ Error("Unknown error");
}
function d(e) {
	let t = /* @__PURE__ */ new Set(), n = [], r = u(e);
	for (; r != null && !t.has(r);) {
		t.add(r);
		let [e, i] = f(r);
		/(?:\.{3}|[.!?])$/.test(e.message) || (e.message += "."), n.push(e), r = i;
	}
	return n;
}
function f(e) {
	let n = e.cause == null ? null : u(e.cause);
	if (e instanceof t) return [{
		data: e.data,
		locator: e.locator,
		message: e.message,
		name: e.name,
		stack: e.stack
	}, n];
	let r = Object.fromEntries(Object.entries(e).filter(([e]) => e !== "cause"));
	return e.name ? [{
		data: r,
		locator: "",
		message: e.message,
		name: e.name,
		stack: e.stack
	}, n] : [{
		data: r,
		locator: "",
		message: m(e),
		name: "Error",
		stack: void 0
	}, null];
}
function p(e) {
	if (e.length === 0) return;
	let t;
	for (let s of e.toReversed()) {
		let e;
		switch (s.name) {
			case "APIError":
				e = new r(s.message, s.locator, s.data, { cause: t });
				break;
			case "AppError":
				e = new n(s.message, s.locator, s.data, { cause: t });
				break;
			case "ConnectorError":
				e = new a(s.message, s.locator, s.data, { cause: t });
				break;
			case "EngineError":
				e = new i(s.message, s.locator, s.data, { cause: t });
				break;
			case "FetchError":
				e = new o(s.message, s.locator, s.data, { cause: t });
				break;
			default:
				e = Error(s.message, { cause: t }), e.name = s.name;
				break;
		}
		s.stack !== void 0 && (e.stack = s.stack), t = e;
	}
	return t;
}
function m(e) {
	let t;
	try {
		t = JSON.stringify(e);
	} catch {
		t = typeof e == "symbol" ? e.description ?? "Unknown error" : typeof e == "bigint" ? e.toString() : "Unknown error";
	}
	return t === "" && (t = "Unknown error"), t;
}
function h(t) {
	if (!(t == null || t === "")) return t.length > e ? `${t.slice(0, e)}... [truncated]` : t;
}
//#endregion
export { r as APIError, n as AppError, a as ConnectorError, t as DPUseError, i as EngineError, o as FetchError, s as buildFetchError, c as concatenateSerialisedErrorMessages, l as ignoreErrors, u as normalizeToError, d as serialiseError, p as unserialiseError };
