({
	name: "main",
	baseUrl: "../src/scripts", 
	mainConfigFile: "../src/scripts/main.js",
	out: "../src/scripts/main-optimized.min.js",
	generateSourceMaps: true,
	preserveLicenseComments: false,
	optimize: "uglify2"
})