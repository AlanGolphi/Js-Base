let reverse = (str = "") => {
	const mid = Math.floor(str.length / 2);
	const s1 = str.substr(0, mid);
	const s2 = str.substr(mid);
	let res = "";
	for (let i = s1.length - 1, j = 0; i >= 0, j <= s2.length - 1; i--, j++) {
		res = `${s2[j] || ""}${res}${s1[i] || ""}`;
	}
	return res;
};
