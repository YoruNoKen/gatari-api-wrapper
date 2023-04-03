const baseURL = "https://osu.gatari.pw";
const { mods } = require("../utils/mods");
const { handlers } = require("../utils/errorHandler");

async function ppCalculator({ beatmap_id, accuracy, misses, max_combo, mods: mod }) {
	if (beatmap_id == undefined || accuracy == undefined || misses == undefined || max_combo == undefined || mod == undefined) {
		throw new Error("all parameters must be defined");
	}

	let _mods = mod;
	if (isNaN(mod)) {
		_mods = mods.id(mod);
	}

	const url = `${baseURL}/letsapi/v1/pp?b=${beatmap_id}&a=${accuracy}&x=${misses}&c=${max_combo}&m=${_mods}`;
	const response = await fetch(url).then((res) => res.json());

	if (response.message != "ok") {
		throw new Error(response.message);
	}

	return response;
}

module.exports = { ppCalculator };