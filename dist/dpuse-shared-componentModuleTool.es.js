import { AppError as e } from "./dpuse-shared-errors.es.js";
//#region src/component/module/tool/index.ts
var t = "https://engine-eu.dpuse.app/tools";
async function n(n, r) {
	let i = `dpuse-tool-${r}`, a = n.find((e) => e.id === i);
	if (!a) {
		let t = {
			availableToolIds: n.map((e) => e.id),
			toolName: i
		};
		throw new e(`Tool '${r}' not found.`, "dpuse-shared.component.module.tool.loadTool", t);
	}
	let o = `${t}/${r}_v${a.version}/${i}.es.js`;
	try {
		return new (await (import(
			/* @vite-ignore */
			o
))).Tool();
	} catch (t) {
		let n = {
			toolName: i,
			url: o,
			version: a.version
		};
		throw new e(`Failed to load tool '${i}' v${a.version}.`, "dpuse-shared.component.module.tool.loadTool", n, { cause: t });
	}
}
//#endregion
export { n as loadTool };
