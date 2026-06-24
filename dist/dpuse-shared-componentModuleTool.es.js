async function e(e, t) {
	let n = `dpuse-tool-${t}`, r = e.find((e) => e.id === n);
	if (!r) throw Error(`Connector could not load unknown tool '${t}'.`);
	return new (await (import(
		/* @vite-ignore */
		`https://engine-eu.dpuse.app/tools/${t}_v${r.version}/${n}.es.js`
))).Tool();
}
//#endregion
export { e as loadTool };
