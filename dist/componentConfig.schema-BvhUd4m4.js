//#region node_modules/valibot/dist/index.mjs
var e = {
	lang: void 0,
	message: void 0,
	abortEarly: void 0,
	abortPipeEarly: void 0
};
/* @__NO_SIDE_EFFECTS__ */
function t(t) {
	return t ? {
		lang: t?.lang ?? void 0,
		message: t?.message,
		abortEarly: t?.abortEarly ?? void 0,
		abortPipeEarly: t?.abortPipeEarly ?? void 0
	} : e;
}
/* @__NO_SIDE_EFFECTS__ */
function n(e) {
	let t = typeof e;
	return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : t;
}
function r(e, t, r, i, a) {
	let o = a && "input" in a ? a.input : r.value, s = a?.expected ?? e.expects ?? null, c = a?.received ?? /* @__PURE__ */ n(o), l = {
		kind: e.kind,
		type: e.type,
		input: o,
		expected: s,
		received: c,
		message: `Invalid ${t}: ${s ? `Expected ${s} but r` : "R"}eceived ${c}`,
		requirement: e.requirement,
		path: a?.path,
		issues: a?.issues,
		lang: i.lang,
		abortEarly: i.abortEarly,
		abortPipeEarly: i.abortPipeEarly
	}, u = e.kind === "schema", d = a?.message ?? e.message ?? (e.reference, l.lang, void 0) ?? (u ? (l.lang, void 0) : null) ?? i.message ?? (l.lang, void 0);
	d !== void 0 && (l.message = typeof d == "function" ? d(l) : d), u && (r.typed = !1), r.issues ? r.issues.push(l) : r.issues = [l];
}
var i = /* @__PURE__ */ new WeakMap();
/* @__NO_SIDE_EFFECTS__ */
function a(e) {
	let n = i.get(e);
	return n || (n = {
		version: 1,
		vendor: "valibot",
		validate(n) {
			return e["~run"]({ value: n }, /* @__PURE__ */ t());
		}
	}, i.set(e, n)), n;
}
/* @__NO_SIDE_EFFECTS__ */
function o(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && t !== "__proto__" && t !== "prototype" && t !== "constructor";
}
/* @__NO_SIDE_EFFECTS__ */
function s(e, t) {
	let n = [...new Set(e)];
	return n.length > 1 ? `(${n.join(` ${t} `)})` : n[0] ?? "never";
}
/* @__NO_SIDE_EFFECTS__ */
function c(e, t, n) {
	return typeof e.fallback == "function" ? e.fallback(t, n) : e.fallback;
}
/* @__NO_SIDE_EFFECTS__ */
function l(e, t, n) {
	return typeof e.default == "function" ? e.default(t, n) : e.default;
}
/* @__NO_SIDE_EFFECTS__ */
function u(e, t) {
	return {
		kind: "schema",
		type: "array",
		reference: u,
		expects: "Array",
		async: !1,
		item: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			let n = e.value;
			if (Array.isArray(n)) {
				e.typed = !0, e.value = [];
				for (let r = 0; r < n.length; r++) {
					let i = n[r], a = this.item["~run"]({ value: i }, t);
					if (a.issues) {
						let o = {
							type: "array",
							origin: "value",
							input: n,
							key: r,
							value: i
						};
						for (let t of a.issues) t.path ? t.path.unshift(o) : t.path = [o], e.issues?.push(t);
						if (e.issues ||= a.issues, t.abortEarly) {
							e.typed = !1;
							break;
						}
					}
					a.typed || (e.typed = !1), e.value.push(a.value);
				}
			} else r(this, "type", e, t);
			return e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function d(e) {
	return {
		kind: "schema",
		type: "boolean",
		reference: d,
		expects: "boolean",
		async: !1,
		message: e,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			return typeof e.value == "boolean" ? e.typed = !0 : r(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function f(e, t) {
	return {
		kind: "schema",
		type: "literal",
		reference: f,
		expects: /* @__PURE__ */ n(e),
		async: !1,
		literal: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			return e.value === this.literal ? e.typed = !0 : r(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function p(e, t) {
	return {
		kind: "schema",
		type: "nullable",
		reference: p,
		expects: `(${e.expects} | null)`,
		async: !1,
		wrapped: e,
		default: t,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ l(this, e, t)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function m(e) {
	return {
		kind: "schema",
		type: "number",
		reference: m,
		expects: "number",
		async: !1,
		message: e,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			return typeof e.value == "number" && !isNaN(e.value) ? e.typed = !0 : r(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function h(e, t) {
	return {
		kind: "schema",
		type: "object",
		reference: h,
		expects: "Object",
		async: !1,
		entries: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			let n = e.value;
			if (n && typeof n == "object") {
				e.typed = !0, e.value = {};
				for (let i in this.entries) {
					let a = this.entries[i];
					if (i in n || (a.type === "exact_optional" || a.type === "optional" || a.type === "nullish") && a.default !== void 0) {
						let r = i in n ? n[i] : /* @__PURE__ */ l(a), o = a["~run"]({ value: r }, t);
						if (o.issues) {
							let a = {
								type: "object",
								origin: "value",
								input: n,
								key: i,
								value: r
							};
							for (let t of o.issues) t.path ? t.path.unshift(a) : t.path = [a], e.issues?.push(t);
							if (e.issues ||= o.issues, t.abortEarly) {
								e.typed = !1;
								break;
							}
						}
						o.typed || (e.typed = !1), e.value[i] = o.value;
					} else if (a.fallback !== void 0) e.value[i] = /* @__PURE__ */ c(a);
					else if (a.type !== "exact_optional" && a.type !== "optional" && a.type !== "nullish" && (r(this, "key", e, t, {
						input: void 0,
						expected: `"${i}"`,
						path: [{
							type: "object",
							origin: "key",
							input: n,
							key: i,
							value: n[i]
						}]
					}), t.abortEarly)) break;
				}
			} else r(this, "type", e, t);
			return e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function g(e, t) {
	return {
		kind: "schema",
		type: "optional",
		reference: g,
		expects: `(${e.expects} | undefined)`,
		async: !1,
		wrapped: e,
		default: t,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ l(this, e, t)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function _(e, t, n) {
	return {
		kind: "schema",
		type: "record",
		reference: _,
		expects: "Object",
		async: !1,
		key: e,
		value: t,
		message: n,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			let n = e.value;
			if (n && typeof n == "object") {
				e.typed = !0, e.value = {};
				for (let r in n) if (/* @__PURE__ */ o(n, r)) {
					let i = n[r], a = this.key["~run"]({ value: r }, t);
					if (a.issues) {
						let o = {
							type: "object",
							origin: "key",
							input: n,
							key: r,
							value: i
						};
						for (let t of a.issues) t.path = [o], e.issues?.push(t);
						if (e.issues ||= a.issues, t.abortEarly) {
							e.typed = !1;
							break;
						}
					}
					let o = this.value["~run"]({ value: i }, t);
					if (o.issues) {
						let a = {
							type: "object",
							origin: "value",
							input: n,
							key: r,
							value: i
						};
						for (let t of o.issues) t.path ? t.path.unshift(a) : t.path = [a], e.issues?.push(t);
						if (e.issues ||= o.issues, t.abortEarly) {
							e.typed = !1;
							break;
						}
					}
					(!a.typed || !o.typed) && (e.typed = !1), a.typed && (e.value[a.value] = o.value);
				}
			} else r(this, "type", e, t);
			return e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function v(e) {
	return {
		kind: "schema",
		type: "string",
		reference: v,
		expects: "string",
		async: !1,
		message: e,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			return typeof e.value == "string" ? e.typed = !0 : r(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function y(e) {
	let t;
	if (e) for (let n of e) if (t) for (let e of n.issues) t.push(e);
	else t = n.issues;
	return t;
}
/* @__NO_SIDE_EFFECTS__ */
function b(e, t) {
	return {
		kind: "schema",
		type: "union",
		reference: b,
		expects: /* @__PURE__ */ s(e.map((e) => e.expects), "|"),
		async: !1,
		options: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ a(this);
		},
		"~run"(e, t) {
			let n, i, a;
			for (let r of this.options) {
				let o = r["~run"]({ value: e.value }, t);
				if (o.typed) {
					if (o.issues) i ? i.push(o) : i = [o];
					else {
						n = o;
						break;
					}
				} else a ? a.push(o) : a = [o];
			}
			if (n) return n;
			if (i) {
				if (i.length === 1) return i[0];
				r(this, "type", e, t, { issues: /* @__PURE__ */ y(i) }), e.typed = !0;
			} else if (a?.length === 1) return a[0];
			else r(this, "type", e, t, { issues: /* @__PURE__ */ y(a) });
			return e;
		}
	};
}
//#endregion
//#region src/locale/locale.schema.ts
var x = /* @__PURE__ */ h({
	en: /* @__PURE__ */ v(),
	es: /* @__PURE__ */ v()
}), S = {
	id: /* @__PURE__ */ v(),
	label: /* @__PURE__ */ h({
		en: /* @__PURE__ */ g(/* @__PURE__ */ v()),
		es: /* @__PURE__ */ g(/* @__PURE__ */ v())
	}),
	description: /* @__PURE__ */ h({
		en: /* @__PURE__ */ g(/* @__PURE__ */ v()),
		es: /* @__PURE__ */ g(/* @__PURE__ */ v())
	}),
	icon: /* @__PURE__ */ p(/* @__PURE__ */ v()),
	iconDark: /* @__PURE__ */ p(/* @__PURE__ */ v())
}, C = (e) => /* @__PURE__ */ b(e.map((e) => /* @__PURE__ */ f(e))), w = C([
	"app",
	"connector",
	"connectorConnection",
	"context",
	"contextArea",
	"contextModel",
	"contextModelDimension",
	"contextModelDimensionHierarchy",
	"contextModelEntity",
	"contextModelEntityDataItem",
	"contextModelEntityEvent",
	"contextModelEntityPrimaryMeasure",
	"contextModelSecondaryMeasure",
	"cookbook",
	"cookbookRecipe",
	"dataView",
	"dimension",
	"engine",
	"eventQuery",
	"presenter",
	"presenterPresentation",
	"tool"
]), T = C([
	"danger",
	"success",
	"warning"
]), E = C([
	"alpha",
	"beta",
	"releaseCandidate",
	"generalAvailability"
]), D = /* @__PURE__ */ h({
	color: T,
	label: /* @__PURE__ */ v()
}), O = {
	...S,
	typeId: w
}, k = /* @__PURE__ */ h({
	...O,
	order: /* @__PURE__ */ m(),
	path: /* @__PURE__ */ v()
}), A = {
	...O,
	firstCreatedAt: /* @__PURE__ */ p(/* @__PURE__ */ m()),
	lastUpdatedAt: /* @__PURE__ */ p(/* @__PURE__ */ m()),
	status: /* @__PURE__ */ p(D),
	statusId: /* @__PURE__ */ p(E)
}, j = /* @__PURE__ */ h({ ...A });
//#endregion
export { x as a, f as c, h as d, g as f, C as i, p as l, v as m, j as n, u as o, _ as p, k as r, d as s, A as t, m as u };
