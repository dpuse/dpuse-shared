//#region node_modules/valibot/dist/index.mjs
var e;
/* @__NO_SIDE_EFFECTS__ */
function t(t) {
	return {
		lang: t?.lang ?? e?.lang,
		message: t?.message,
		abortEarly: t?.abortEarly ?? e?.abortEarly,
		abortPipeEarly: t?.abortPipeEarly ?? e?.abortPipeEarly
	};
}
var n;
/* @__NO_SIDE_EFFECTS__ */
function r(e) {
	return n?.get(e);
}
var i;
/* @__NO_SIDE_EFFECTS__ */
function a(e) {
	return i?.get(e);
}
var o;
/* @__NO_SIDE_EFFECTS__ */
function s(e, t) {
	return o?.get(e)?.get(t);
}
/* @__NO_SIDE_EFFECTS__ */
function c(e) {
	let t = typeof e;
	return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : t;
}
function l(e, t, n, i, o) {
	let l = o && "input" in o ? o.input : n.value, u = o?.expected ?? e.expects ?? null, d = o?.received ?? /* @__PURE__ */ c(l), f = {
		kind: e.kind,
		type: e.type,
		input: l,
		expected: u,
		received: d,
		message: `Invalid ${t}: ${u ? `Expected ${u} but r` : "R"}eceived ${d}`,
		requirement: e.requirement,
		path: o?.path,
		issues: o?.issues,
		lang: i.lang,
		abortEarly: i.abortEarly,
		abortPipeEarly: i.abortPipeEarly
	}, p = e.kind === "schema", m = o?.message ?? e.message ?? /* @__PURE__ */ s(e.reference, f.lang) ?? (p ? /* @__PURE__ */ a(f.lang) : null) ?? i.message ?? /* @__PURE__ */ r(f.lang);
	m !== void 0 && (f.message = typeof m == "function" ? m(f) : m), p && (n.typed = !1), n.issues ? n.issues.push(f) : n.issues = [f];
}
/* @__NO_SIDE_EFFECTS__ */
function u(e) {
	return {
		version: 1,
		vendor: "valibot",
		validate(n) {
			return e["~run"]({ value: n }, /* @__PURE__ */ t());
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function d(e, t) {
	return Object.hasOwn(e, t) && t !== "__proto__" && t !== "prototype" && t !== "constructor";
}
/* @__NO_SIDE_EFFECTS__ */
function f(e, t) {
	let n = [...new Set(e)];
	return n.length > 1 ? `(${n.join(` ${t} `)})` : n[0] ?? "never";
}
/* @__NO_SIDE_EFFECTS__ */
function p(e, t, n) {
	return typeof e.fallback == "function" ? e.fallback(t, n) : e.fallback;
}
/* @__NO_SIDE_EFFECTS__ */
function m(e, t, n) {
	return typeof e.default == "function" ? e.default(t, n) : e.default;
}
/* @__NO_SIDE_EFFECTS__ */
function h(e, t) {
	return {
		kind: "schema",
		type: "array",
		reference: h,
		expects: "Array",
		async: !1,
		item: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
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
			} else l(this, "type", e, t);
			return e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function g(e) {
	return {
		kind: "schema",
		type: "boolean",
		reference: g,
		expects: "boolean",
		async: !1,
		message: e,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
		},
		"~run"(e, t) {
			return typeof e.value == "boolean" ? e.typed = !0 : l(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function _(e, t) {
	return {
		kind: "schema",
		type: "literal",
		reference: _,
		expects: /* @__PURE__ */ c(e),
		async: !1,
		literal: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
		},
		"~run"(e, t) {
			return e.value === this.literal ? e.typed = !0 : l(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function v(e, t) {
	return {
		kind: "schema",
		type: "nullable",
		reference: v,
		expects: `(${e.expects} | null)`,
		async: !1,
		wrapped: e,
		default: t,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
		},
		"~run"(e, t) {
			return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ m(this, e, t)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function y(e) {
	return {
		kind: "schema",
		type: "number",
		reference: y,
		expects: "number",
		async: !1,
		message: e,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
		},
		"~run"(e, t) {
			return typeof e.value == "number" && !isNaN(e.value) ? e.typed = !0 : l(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function b(e, t) {
	return {
		kind: "schema",
		type: "object",
		reference: b,
		expects: "Object",
		async: !1,
		entries: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
		},
		"~run"(e, t) {
			let n = e.value;
			if (n && typeof n == "object") {
				e.typed = !0, e.value = {};
				for (let r in this.entries) {
					let i = this.entries[r];
					if (r in n || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
						let a = r in n ? n[r] : /* @__PURE__ */ m(i), o = i["~run"]({ value: a }, t);
						if (o.issues) {
							let i = {
								type: "object",
								origin: "value",
								input: n,
								key: r,
								value: a
							};
							for (let t of o.issues) t.path ? t.path.unshift(i) : t.path = [i], e.issues?.push(t);
							if (e.issues ||= o.issues, t.abortEarly) {
								e.typed = !1;
								break;
							}
						}
						o.typed || (e.typed = !1), e.value[r] = o.value;
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ p(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (l(this, "key", e, t, {
						input: void 0,
						expected: `"${r}"`,
						path: [{
							type: "object",
							origin: "key",
							input: n,
							key: r,
							value: n[r]
						}]
					}), t.abortEarly)) break;
				}
			} else l(this, "type", e, t);
			return e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function x(e, t) {
	return {
		kind: "schema",
		type: "optional",
		reference: x,
		expects: `(${e.expects} | undefined)`,
		async: !1,
		wrapped: e,
		default: t,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
		},
		"~run"(e, t) {
			return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ m(this, e, t)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function S(e, t, n) {
	return {
		kind: "schema",
		type: "record",
		reference: S,
		expects: "Object",
		async: !1,
		key: e,
		value: t,
		message: n,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
		},
		"~run"(e, t) {
			let n = e.value;
			if (n && typeof n == "object") {
				e.typed = !0, e.value = {};
				for (let r in n) if (/* @__PURE__ */ d(n, r)) {
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
			} else l(this, "type", e, t);
			return e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function C(e) {
	return {
		kind: "schema",
		type: "string",
		reference: C,
		expects: "string",
		async: !1,
		message: e,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
		},
		"~run"(e, t) {
			return typeof e.value == "string" ? e.typed = !0 : l(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function w(e) {
	let t;
	if (e) for (let n of e) t ? t.push(...n.issues) : t = n.issues;
	return t;
}
/* @__NO_SIDE_EFFECTS__ */
function T(e, t) {
	return {
		kind: "schema",
		type: "union",
		reference: T,
		expects: /* @__PURE__ */ f(e.map((e) => e.expects), "|"),
		async: !1,
		options: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ u(this);
		},
		"~run"(e, t) {
			let n, r, i;
			for (let a of this.options) {
				let o = a["~run"]({ value: e.value }, t);
				if (o.typed) if (o.issues) r ? r.push(o) : r = [o];
				else {
					n = o;
					break;
				}
				else i ? i.push(o) : i = [o];
			}
			if (n) return n;
			if (r) {
				if (r.length === 1) return r[0];
				l(this, "type", e, t, { issues: /* @__PURE__ */ w(r) }), e.typed = !0;
			} else if (i?.length === 1) return i[0];
			else l(this, "type", e, t, { issues: /* @__PURE__ */ w(i) });
			return e;
		}
	};
}
//#endregion
//#region src/schema.ts
var E = (e) => /* @__PURE__ */ T(e.map((e) => /* @__PURE__ */ _(e))), D = /* @__PURE__ */ b({
	en: /* @__PURE__ */ C(),
	es: /* @__PURE__ */ C()
}), O = /* @__PURE__ */ b({
	en: /* @__PURE__ */ x(/* @__PURE__ */ C()),
	es: /* @__PURE__ */ x(/* @__PURE__ */ C())
}), k = E([
	"amber",
	"green",
	"red",
	"other"
]), A = E([
	"alpha",
	"beta",
	"generalAvailability",
	"notApplicable",
	"preAlpha",
	"proposed",
	"releaseCandidate",
	"unavailable",
	"underReview"
]), j = E([
	"app",
	"connector",
	"connectorConnection",
	"context",
	"contextModelGroup",
	"contextModel",
	"contextModelDimensionGroup",
	"contextModelDimension",
	"contextModelDimensionHierarchy",
	"contextModelEntityGroup",
	"contextModelEntity",
	"contextModelEntityDataItem",
	"contextModelEntityEvent",
	"contextModelEntityPrimaryMeasure",
	"contextModelSecondaryMeasureGroup",
	"contextModelSecondaryMeasure",
	"dataView",
	"dimension",
	"engine",
	"eventQuery",
	"presenter",
	"presenterPresentation",
	"tool"
]), M = {
	id: /* @__PURE__ */ C(),
	label: O,
	description: O,
	firstCreatedAt: /* @__PURE__ */ x(/* @__PURE__ */ y()),
	icon: /* @__PURE__ */ v(/* @__PURE__ */ C()),
	iconDark: /* @__PURE__ */ v(/* @__PURE__ */ C()),
	lastUpdatedAt: /* @__PURE__ */ v(/* @__PURE__ */ y()),
	status: /* @__PURE__ */ v(/* @__PURE__ */ b({
		id: /* @__PURE__ */ C(),
		color: k,
		label: /* @__PURE__ */ C()
	})),
	statusId: A
}, N = /* @__PURE__ */ b({
	...M,
	typeId: j
}), P = /* @__PURE__ */ b({
	id: /* @__PURE__ */ C(),
	label: O,
	description: O,
	icon: /* @__PURE__ */ v(/* @__PURE__ */ C()),
	iconDark: /* @__PURE__ */ v(/* @__PURE__ */ C()),
	order: /* @__PURE__ */ y(),
	path: /* @__PURE__ */ C()
});
//#endregion
export { O as a, g as c, y as d, b as f, C as h, D as i, _ as l, S as m, N as n, E as o, x as p, P as r, h as s, M as t, v as u };
