
import { loadFile } from './file-loader'
import { simulate } from './simulate'
import { ExcelSheet } from './types'

const messageInterval = 5000
const spawnerTimeout = 3500
// const allowedSheets = ['bin-006']
const allowedSheets = []

const spawnSimulator = (sheet: ExcelSheet, timeout: number, interval: number) => {
	setTimeout(() => simulate(sheet, interval), timeout)
}

let timeout = 0
const sheets = loadFile()
for (const sheet of sheets) {
	if (allowedSheets.length === 0 || allowedSheets.includes(sheet.name)) {
		spawnSimulator(sheet, timeout, messageInterval)
		timeout += spawnerTimeout
	}
}

