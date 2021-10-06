import type { NextPage } from 'next'
import Layout from '../components/Layout'
import React, { useState } from 'react'

import Tab from '../components/tab/Tab'
import MidiIn from '../components/tab/MidiIn'
import PianoRoll from '../components/tab/PianoRoll/PianoRoll'
import EventList from '../components/tab/EventList'
import Param from '../components/tab/Param'
import Tuning from '../components/tab/Tuning'
import { noteNumberToNoteName } from '../components/tab/Lib'
import { NoteDatum } from '../components/tab/type'

const originalData: NoteDatum[] = [
	{ channel:1, note: 64, time: 0, duration: 0.25 },
	{ channel:1, note: 63, time: 0.25, duration: 0.25 },
	{ channel:1, note: 64, time: 0.5, duration: 0.25 },
	{ channel:1, note: 63, time: 0.75, duration: 0.25 },
	{ channel:1, note: 64, time: 1, duration: 0.25 },
	{ channel:1, note: 59, time: 1.25, duration: 0.25 },
	{ channel:1, note: 62, time: 1.5, duration: 0.25 },
	{ channel:1, note: 60, time: 1.75, duration: 0.25 },
	{ channel:1, note: 45, time: 2, duration: 1 },
	{ channel:1, note: 52, time: 2, duration: 1 },
	{ channel:1, note: 57, time: 2, duration: 1 },
	{ channel:1, note: 52, time: 3, duration: 0.25 },
	{ channel:1, note: 57, time: 3.25, duration: 0.25 },
	{ channel:1, note: 40, time: 3.5, duration: 0.75 },
	{ channel:1, note: 56, time: 3.5, duration: 0.75 },
	{ channel:1, note: 59, time: 3.5, duration: 0.75 },
]

const Home: NextPage = () => {
	const [w, setW] = useState(0.8)
	const [noteData, setNoteData] = useState<NoteDatum[]>(originalData)
	const [tuning, setTuning] = useState<number[]>([40, 45, 50, 55, 59, 64])
	const [channel, setChannel] = useState<number>(0)
	const [state, setState] = useState<'loading'|'complete'>('loading')

	return <Layout title='Home' navNum={0}>
		<div className="bg-light my-3 p-3">
			{/* {state} */}
			<MidiIn noteData={noteData} setNoteData={setNoteData} setState={setState} setChannel={setChannel} />
			{state === 'loading'? '' : 
			<div className='row'>
				<div className="col-3">
					<EventList noteData={noteData} channel={channel} />
				</div>
				<div className="col-9">
					<PianoRoll noteData={noteData} channel={channel} setChannel={setChannel} />
				</div>
			</div>
			}

			<Param w={w} setW={setW} />

			<Tuning setTuning={setTuning} />

			Tuning: {tuning.map(value => noteNumberToNoteName(value)).join(', ')}
		</div>

		{state === 'loading'? '' : 
			<Tab w={w} noteData={noteData} tuning={tuning} channel={channel} />
		}
	</Layout>
}

export default Home
