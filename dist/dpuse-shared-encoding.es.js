//#region src/encoding/encodingConfigs.json
var e = {
	id: "ascii",
	groupLabel: "",
	label: "ascii",
	isDetectable: !1,
	isDecodable: !0
}, t = {
	id: "big5",
	groupLabel: "Chinese Traditional",
	label: "Chinese Traditional (big5)",
	isDetectable: !0,
	isDecodable: !0
}, n = {
	id: "gb18030",
	groupLabel: "Chinese Simplified",
	label: "Chinese Simplified (gb18030)",
	isDetectable: !0,
	isDecodable: !0
}, r = {
	id: "gbk",
	groupLabel: "Chinese Simplified",
	label: "Chinese Simplified (gbk)",
	isDetectable: !1,
	isDecodable: !0
}, i = {
	id: "ibm866",
	groupLabel: "Cyrillic",
	label: "Cyrillic (ibm866)",
	isDetectable: !1,
	isDecodable: !0
}, a = {
	id: "latin1",
	groupLabel: "Western",
	label: "Western (latin1)",
	isDetectable: !1,
	isDecodable: !0
}, o = {
	id: "macintosh",
	groupLabel: "Western",
	label: "Western (macintosh)",
	isDetectable: !1,
	isDecodable: !0
}, s = {
	id: "shift_jis",
	groupLabel: "Japanese",
	label: "Japanese (shift_jis)",
	isDetectable: !0,
	isDecodable: !0
}, c = {
	id: "utf16",
	groupLabel: "Unicode 16",
	label: "Unicode 16 (utf16)",
	isDetectable: !1,
	isDecodable: !0
}, l = {
	id: "utf16be",
	groupLabel: "Unicode 16",
	label: "Unicode 16 (utf16be)",
	isDetectable: !0,
	isDecodable: !0
}, u = {
	id: "utf16le",
	groupLabel: "Unicode 16",
	label: "Unicode 16 (utf16le)",
	isDetectable: !0,
	isDecodable: !0
}, d = {
	id: "utf32be",
	groupLabel: "Unicode 32",
	label: "Unicode 32 (utf32be)",
	isDetectable: !0,
	isDecodable: !1
}, f = {
	id: "utf32le",
	groupLabel: "Unicode 32",
	label: "Unicode 32 (utf32le)",
	isDetectable: !0,
	isDecodable: !1
}, p = {
	id: "utf8",
	groupLabel: "",
	label: "utf8",
	isDetectable: !0,
	isDecodable: !0
}, m = {
	ascii: e,
	big5: t,
	"euc-jp": {
		id: "euc-jp",
		groupLabel: "Japanese",
		label: "Japanese (euc-jp)",
		isDetectable: !0,
		isDecodable: !0
	},
	"euc-kr": {
		id: "euc-kr",
		groupLabel: "Korean",
		label: "Korean (euc-kr)",
		isDetectable: !0,
		isDecodable: !0
	},
	gb18030: n,
	gbk: r,
	ibm866: i,
	"iso-2022-cn": {
		id: "iso-2022-cn",
		groupLabel: "Japanese",
		label: "Japanese (iso-2022-cn)",
		isDetectable: !0,
		isDecodable: !1
	},
	"iso-2022-jp": {
		id: "iso-2022-jp",
		groupLabel: "Japanese",
		label: "Japanese (iso-2022-jp)",
		isDetectable: !0,
		isDecodable: !0
	},
	"iso-2022-kr": {
		id: "iso-2022-kr",
		groupLabel: "Korean",
		label: "Korean (iso-2022-kr)",
		isDetectable: !0,
		isDecodable: !1
	},
	"iso-8859-1": {
		id: "iso-8859-1",
		groupLabel: "Western",
		label: "Western (iso-8859-1)",
		isDetectable: !0,
		isDecodable: !0
	},
	"iso-8859-2": {
		id: "iso-8859-2",
		groupLabel: "Central European",
		label: "Central European (iso-8859-2)",
		isDetectable: !0,
		isDecodable: !0
	},
	"iso-8859-3": {
		id: "iso-8859-3",
		groupLabel: "Southern European",
		label: "Southern European (iso-8859-3)",
		isDetectable: !1,
		isDecodable: !0
	},
	"iso-8859-4": {
		id: "iso-8859-4",
		groupLabel: "Baltic",
		label: "Baltic (iso-8859-4)",
		isDetectable: !1,
		isDecodable: !0
	},
	"iso-8859-5": {
		id: "iso-8859-5",
		groupLabel: "Cyrillic",
		label: "Cyrillic (iso-8859-5)",
		isDetectable: !0,
		isDecodable: !0
	},
	"iso-8859-6": {
		id: "iso-8859-6",
		groupLabel: "Arabic",
		label: "Arabic (iso-8859-6)",
		isDetectable: !0,
		isDecodable: !0
	},
	"iso-8859-7": {
		id: "iso-8859-7",
		groupLabel: "Greek",
		label: "Greek (iso-8859-7)",
		isDetectable: !0,
		isDecodable: !0
	},
	"iso-8859-8": {
		id: "iso-8859-8",
		groupLabel: "Hebrew",
		label: "Hebrew (iso-8859-8)",
		isDetectable: !0,
		isDecodable: !0
	},
	"iso-8859-9": {
		id: "iso-8859-9",
		groupLabel: "Turkish",
		label: "Turkish (iso-8859-9)",
		isDetectable: !0,
		isDecodable: !0
	},
	"iso-8859-10": {
		id: "iso-8859-10",
		groupLabel: "Nordic",
		label: "Nordic (iso-8859-10)",
		isDetectable: !1,
		isDecodable: !0
	},
	"iso-8859-11": {
		id: "iso-8859-11",
		groupLabel: "Thai",
		label: "Thai (iso-8859-11)",
		isDetectable: !1,
		isDecodable: !0
	},
	"iso-8859-13": {
		id: "iso-8859-13",
		groupLabel: "Baltic",
		label: "Baltic (iso-8859-13)",
		isDetectable: !1,
		isDecodable: !0
	},
	"iso-8859-14": {
		id: "iso-8859-14",
		groupLabel: "Celtic",
		label: "Celtic (iso-8859-14)",
		isDetectable: !1,
		isDecodable: !0
	},
	"iso-8859-15": {
		id: "iso-8859-15",
		groupLabel: "Western",
		label: "Western (iso-8859-15)",
		isDetectable: !1,
		isDecodable: !0
	},
	"iso-8859-16": {
		id: "iso-8859-16",
		groupLabel: "Romanian",
		label: "Romanian (iso-8859-16)",
		isDetectable: !1,
		isDecodable: !0
	},
	"kOi8-r": {
		id: "koi8-r",
		groupLabel: "Cyrillic",
		label: "Cyrillic (koi8-r)",
		isDetectable: !0,
		isDecodable: !0
	},
	"kOi8-u": {
		id: "koi8-u",
		groupLabel: "Cyrillic",
		label: "Cyrillic (koi8-u)",
		isDetectable: !1,
		isDecodable: !0
	},
	latin1: a,
	macintosh: o,
	shift_jis: s,
	"tis-620": {
		id: "tis-620",
		groupLabel: "Thai",
		label: "Thai (tis-620)",
		isDetectable: !1,
		isDecodable: !0
	},
	utf16: c,
	utf16be: l,
	utf16le: u,
	utf32be: d,
	utf32le: f,
	utf8: p,
	"windows-1250": {
		id: "windows-1250",
		groupLabel: "Central European",
		label: "Central European (windows-1250)",
		isDetectable: !0,
		isDecodable: !0
	},
	"windows-1251": {
		id: "windows-1251",
		groupLabel: "Cyrillic",
		label: "Cyrillic (windows-1251)",
		isDetectable: !0,
		isDecodable: !0
	},
	"windows-1252": {
		id: "windows-1252",
		groupLabel: "Western",
		label: "Western (windows-1252)",
		isDetectable: !0,
		isDecodable: !0
	},
	"windows-1253": {
		id: "windows-1253",
		groupLabel: "Greek",
		label: "Greek (windows-1253)",
		isDetectable: !0,
		isDecodable: !0
	},
	"windows-1254": {
		id: "windows-1254",
		groupLabel: "Turkish",
		label: "Turkish (windows-1254)",
		isDetectable: !0,
		isDecodable: !0
	},
	"windows-1255": {
		id: "windows-1255",
		groupLabel: "Hebrew",
		label: "Hebrew (windows-1255)",
		isDetectable: !0,
		isDecodable: !0
	},
	"windows-1256": {
		id: "windows-1256",
		groupLabel: "Arabic",
		label: "Arabic (windows-1256)",
		isDetectable: !0,
		isDecodable: !0
	},
	"windows-1257": {
		id: "windows-1257",
		groupLabel: "Baltic",
		label: "Baltic (windows-1257)",
		isDetectable: !1,
		isDecodable: !0
	},
	"windows-1258": {
		id: "windows-1258",
		groupLabel: "Vietnamese",
		label: "Vietnamese (windows-1258)",
		isDetectable: !1,
		isDecodable: !0
	},
	"windows-874": {
		id: "windows-874",
		groupLabel: "Thai",
		label: "Thai (windows-874)",
		isDetectable: !1,
		isDecodable: !0
	},
	"x-mac-cyrillic": {
		id: "x-mac-cyrillic",
		groupLabel: "Cyrillic",
		label: "Cyrillic (x-mac-cyrillic)",
		isDetectable: !1,
		isDecodable: !0
	},
	"x-user-defined": {
		id: "x-user-defined",
		groupLabel: "Other",
		label: "Other (x-user-defined)",
		isDetectable: !1,
		isDecodable: !0
	}
};
function h(e = "en") {
	let t = [];
	for (let [, e] of Object.entries(m)) t.push({
		...e,
		label: e.label || e.id
	});
	return t.toSorted((e, t) => e.groupLabel.localeCompare(t.groupLabel) || e.label.localeCompare(t.label));
}
//#endregion
export { m as encodingConfigMap, h as getEncodingTypeConfigs };
