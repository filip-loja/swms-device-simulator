
import * as fs from 'fs'
import * as path from 'path'
import xlsx from 'node-xlsx';

export const loadFile  = () => {
	const fileName = (process.argv[2] || '').trim()
	const filePath = path.resolve('data/' + fileName + '.xlsx')
	if (!fileName || !fs.existsSync(filePath)) {
		throw new Error(`File not found at path: "${filePath}"`)
	}
	return xlsx.parse(filePath)
}
