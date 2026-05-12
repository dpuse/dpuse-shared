//#region node_modules/valibot/dist/index.mjs
var e, t = {
	lang: void 0,
	message: void 0,
	abortEarly: void 0,
	abortPipeEarly: void 0
};
/* @__NO_SIDE_EFFECTS__ */
function n(n) {
	return !n && !e ? t : {
		lang: n?.lang ?? e?.lang,
		message: n?.message,
		abortEarly: n?.abortEarly ?? e?.abortEarly,
		abortPipeEarly: n?.abortPipeEarly ?? e?.abortPipeEarly
	};
}
var r;
/* @__NO_SIDE_EFFECTS__ */
function i(e) {
	return r?.get(e);
}
var a;
/* @__NO_SIDE_EFFECTS__ */
function o(e) {
	return a?.get(e);
}
var s;
/* @__NO_SIDE_EFFECTS__ */
function c(e, t) {
	return s?.get(e)?.get(t);
}
/* @__NO_SIDE_EFFECTS__ */
function l(e) {
	let t = typeof e;
	return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : t;
}
function u(e, t, n, r, a) {
	let s = a && "input" in a ? a.input : n.value, u = a?.expected ?? e.expects ?? null, d = a?.received ?? /* @__PURE__ */ l(s), f = {
		kind: e.kind,
		type: e.type,
		input: s,
		expected: u,
		received: d,
		message: `Invalid ${t}: ${u ? `Expected ${u} but r` : "R"}eceived ${d}`,
		requirement: e.requirement,
		path: a?.path,
		issues: a?.issues,
		lang: r.lang,
		abortEarly: r.abortEarly,
		abortPipeEarly: r.abortPipeEarly
	}, p = e.kind === "schema", m = a?.message ?? e.message ?? /* @__PURE__ */ c(e.reference, f.lang) ?? (p ? /* @__PURE__ */ o(f.lang) : null) ?? r.message ?? /* @__PURE__ */ i(f.lang);
	m !== void 0 && (f.message = typeof m == "function" ? m(f) : m), p && (n.typed = !1), n.issues ? n.issues.push(f) : n.issues = [f];
}
var d = /* @__PURE__ */ new WeakMap();
/* @__NO_SIDE_EFFECTS__ */
function f(e) {
	let t = d.get(e);
	return t || (t = {
		version: 1,
		vendor: "valibot",
		validate(t) {
			return e["~run"]({ value: t }, /* @__PURE__ */ n());
		}
	}, d.set(e, t)), t;
}
/* @__NO_SIDE_EFFECTS__ */
function p(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && t !== "__proto__" && t !== "prototype" && t !== "constructor";
}
/* @__NO_SIDE_EFFECTS__ */
function m(e, t) {
	let n = [...new Set(e)];
	return n.length > 1 ? `(${n.join(` ${t} `)})` : n[0] ?? "never";
}
/* @__NO_SIDE_EFFECTS__ */
function h(e, t, n) {
	return typeof e.fallback == "function" ? e.fallback(t, n) : e.fallback;
}
/* @__NO_SIDE_EFFECTS__ */
function g(e, t, n) {
	return typeof e.default == "function" ? e.default(t, n) : e.default;
}
/* @__NO_SIDE_EFFECTS__ */
function _(e, t) {
	return {
		kind: "schema",
		type: "array",
		reference: _,
		expects: "Array",
		async: !1,
		item: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
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
			} else u(this, "type", e, t);
			return e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function v(e) {
	return {
		kind: "schema",
		type: "boolean",
		reference: v,
		expects: "boolean",
		async: !1,
		message: e,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
		},
		"~run"(e, t) {
			return typeof e.value == "boolean" ? e.typed = !0 : u(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function y(e, t) {
	return {
		kind: "schema",
		type: "literal",
		reference: y,
		expects: /* @__PURE__ */ l(e),
		async: !1,
		literal: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
		},
		"~run"(e, t) {
			return e.value === this.literal ? e.typed = !0 : u(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function b(e, t) {
	return {
		kind: "schema",
		type: "nullable",
		reference: b,
		expects: `(${e.expects} | null)`,
		async: !1,
		wrapped: e,
		default: t,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
		},
		"~run"(e, t) {
			return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ g(this, e, t)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function x(e) {
	return {
		kind: "schema",
		type: "number",
		reference: x,
		expects: "number",
		async: !1,
		message: e,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
		},
		"~run"(e, t) {
			return typeof e.value == "number" && !isNaN(e.value) ? e.typed = !0 : u(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function S(e, t) {
	return {
		kind: "schema",
		type: "object",
		reference: S,
		expects: "Object",
		async: !1,
		entries: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
		},
		"~run"(e, t) {
			let n = e.value;
			if (n && typeof n == "object") {
				e.typed = !0, e.value = {};
				for (let r in this.entries) {
					let i = this.entries[r];
					if (r in n || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
						let a = r in n ? n[r] : /* @__PURE__ */ g(i), o = i["~run"]({ value: a }, t);
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
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ h(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (u(this, "key", e, t, {
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
			} else u(this, "type", e, t);
			return e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function C(e, t) {
	return {
		kind: "schema",
		type: "optional",
		reference: C,
		expects: `(${e.expects} | undefined)`,
		async: !1,
		wrapped: e,
		default: t,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
		},
		"~run"(e, t) {
			return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ g(this, e, t)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function w(e, t, n) {
	return {
		kind: "schema",
		type: "record",
		reference: w,
		expects: "Object",
		async: !1,
		key: e,
		value: t,
		message: n,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
		},
		"~run"(e, t) {
			let n = e.value;
			if (n && typeof n == "object") {
				e.typed = !0, e.value = {};
				for (let r in n) if (/* @__PURE__ */ p(n, r)) {
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
			} else u(this, "type", e, t);
			return e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function T(e) {
	return {
		kind: "schema",
		type: "string",
		reference: T,
		expects: "string",
		async: !1,
		message: e,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
		},
		"~run"(e, t) {
			return typeof e.value == "string" ? e.typed = !0 : u(this, "type", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function E(e) {
	let t;
	if (e) for (let n of e) if (t) for (let e of n.issues) t.push(e);
	else t = n.issues;
	return t;
}
/* @__NO_SIDE_EFFECTS__ */
function D(e, t) {
	return {
		kind: "schema",
		type: "union",
		reference: D,
		expects: /* @__PURE__ */ m(e.map((e) => e.expects), "|"),
		async: !1,
		options: e,
		message: t,
		get "~standard"() {
			return /* @__PURE__ */ f(this);
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
				u(this, "type", e, t, { issues: /* @__PURE__ */ E(r) }), e.typed = !0;
			} else if (i?.length === 1) return i[0];
			else u(this, "type", e, t, { issues: /* @__PURE__ */ E(i) });
			return e;
		}
	};
}
//#endregion
//#region src/schema.ts
var O = (e) => /* @__PURE__ */ D(e.map((e) => /* @__PURE__ */ y(e))), k = /* @__PURE__ */ S({
	en: /* @__PURE__ */ T(),
	es: /* @__PURE__ */ T()
}), A = /* @__PURE__ */ S({
	en: /* @__PURE__ */ C(/* @__PURE__ */ T()),
	es: /* @__PURE__ */ C(/* @__PURE__ */ T())
}), j = O([
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
]), M = O([
	"amber",
	"green",
	"red",
	"other"
]), N = O([
	"alpha",
	"beta",
	"generalAvailability",
	"notApplicable",
	"preAlpha",
	"proposed",
	"releaseCandidate",
	"unavailable",
	"underReview"
]), P = /* @__PURE__ */ S({
	color: M,
	label: /* @__PURE__ */ T()
}), F = /* @__PURE__ */ S({
	id: /* @__PURE__ */ T(),
	label: A,
	description: A,
	icon: /* @__PURE__ */ b(/* @__PURE__ */ T()),
	iconDark: /* @__PURE__ */ b(/* @__PURE__ */ T()),
	iconNeutral: /* @__PURE__ */ b(/* @__PURE__ */ T()),
	order: /* @__PURE__ */ x(),
	path: /* @__PURE__ */ T()
}), I = {
	id: /* @__PURE__ */ T(),
	label: A,
	description: A,
	firstCreatedAt: /* @__PURE__ */ b(/* @__PURE__ */ x()),
	icon: /* @__PURE__ */ b(/* @__PURE__ */ T()),
	iconDark: /* @__PURE__ */ b(/* @__PURE__ */ T()),
	iconNeutral: /* @__PURE__ */ b(/* @__PURE__ */ T()),
	lastUpdatedAt: /* @__PURE__ */ b(/* @__PURE__ */ x()),
	status: /* @__PURE__ */ b(P),
	statusId: /* @__PURE__ */ b(N)
}, L = /* @__PURE__ */ S({
	...I,
	typeId: j
});
//#endregion
export { O as a, y as c, S as d, C as f, k as i, b as l, T as m, L as n, _ as o, w as p, F as r, v as s, I as t, x as u };
