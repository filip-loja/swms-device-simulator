import { ExcelSheet } from './types'
import { Mqtt } from 'azure-iot-device-mqtt'
import { Client, Message } from 'azure-iot-device'

export const simulate = (sheet: ExcelSheet, interval: number) => {
	const connectionStr = sheet.data.shift()[0].trim()
	const client = Client.fromConnectionString(connectionStr, Mqtt);

	console.log(`Spawned simulator for "${sheet.name}".`)

	let rowIndex = 0
	let finalIndex = sheet.data.length
	let finish = false

	let intervalRef = setInterval(() => {
		const messageObj = {
			binId: sheet.name,
			fullness: sheet.data[rowIndex][0],
			smoke: sheet.data[rowIndex][1],
			tilt: sheet.data[rowIndex][2],
		}
		const message = new Message(JSON.stringify(messageObj))

		client.sendEvent(message, err => {
			if (err) {
				console.error('  ->  Error: ' + err.toString())
			} else {
				console.log('  -> ', messageObj)
				if (finish) {
					setTimeout(() => console.log(`Simulation for "${sheet.name}" was terminated.`), 0)
				}
			}
		})

		rowIndex++
		if (rowIndex === finalIndex || !sheet.data[rowIndex].length) {
			clearInterval(intervalRef)
			intervalRef = null
			finish = true
		}
	}, interval)

}
