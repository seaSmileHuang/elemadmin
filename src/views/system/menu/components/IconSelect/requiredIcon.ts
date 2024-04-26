const modules = import.meta.glob("@/assets/icons/*.svg")

const svgList	= Object.keys(modules).map(key => {
	const name = key.replace(/^.*\/(\S+)\..*/, '$1')
	return name
})

export default svgList
console.log("modules", modules)
