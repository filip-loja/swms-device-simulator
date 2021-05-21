import { ExcelSheet } from './types'
import { Mqtt } from 'azure-iot-device-mqtt'
import { Client, Message } from 'azure-iot-device'

export const simulate = (sheet: ExcelSheet, interval: number) => {
	const connectionStr = sheet.data.shift()[0].trim()
	const client = Client.fromConnectionString(connectionStr, Mqtt);

	console.log(`Simulation for "${sheet.name}" started.`)

	let rowIndex = 0
	let finalIndex = sheet.data.length

	let intervalRef = setInterval(() => {
		const messageStr = sheet.name + ';' + sheet.data[rowIndex].join(';')
		const message = new Message(messageStr)
		console.log('  -> ', messageStr)

		client.sendEvent(message, err => {
			if (err) {
				console.error('  -> Error: ' + err.toString())
			}
		})

		rowIndex++
		if (rowIndex === finalIndex || !sheet.data[rowIndex].length) {
			clearInterval(intervalRef)
			intervalRef = null
			console.log(`Simulation for "${sheet.name}" finished.`)
		}
	}, interval)

}
