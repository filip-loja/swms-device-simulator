import { ExcelSheet } from './types'

export const simulate = (sheet: ExcelSheet, interval: number) => {
	console.log(`Simulation for "${sheet.name}" started.`)
	let rowIndex = 0
	let finalIndex = sheet.data.length

	let intervalRef = setInterval(() => {
		const message = sheet.name + ';' + sheet.data[rowIndex].join(';')
		// TODO send mesage to azure
		console.log('  -> ', message)
		rowIndex++
		if (rowIndex === finalIndex || !sheet.data[rowIndex].length) {
			clearInterval(intervalRef)
			intervalRef = null
			console.log(`Simulation for "${sheet.name}" finished.`)
		}
	}, interval)

}
