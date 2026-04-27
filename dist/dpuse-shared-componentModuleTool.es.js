//#region src/component/module/tool/index.ts
var e = "https://engine-eu.dpuse.app/tools";
async function t(t, n) {
	let r = `dpuse-tool-${n}`, i = t.find((e) => e.id === r);
	if (!i) throw Error(`Connector could not load unknown tool '${n}'.`);
	return new (await (import(
		/* @vite-ignore */
		`${e}/${n}_v${i.version}/${r}.es.js`
))).Tool();
}
//#endregion
export { t as loadTool };
