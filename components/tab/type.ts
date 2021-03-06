// tonejsのデータ構造をそのまま利用する
export interface NoteDatum {
    channel: number
    note: number // MIDIのノート（60 = ドの音）
    time: number // 小節（0小節から始まる、2で1小節）
    duration: number // 長さ（2で全音符, 0.5: 4分音符, 0.25: 8分音符）
}

export interface RawFinger {
    name: string,
    form: number[],
    finger: number[], 
    barre: number,
}

export interface Finger extends RawFinger{
    cost: number
}

export interface DebugNote {
    correctForm: number
    score: number
    recall: number
    cost: number
    cp: number
    cc: number
}

export interface TimeSignature {
    measures?: number | undefined
    ticks: number
    timeSignature: number[]
}

export interface Song {
	date: string

    title: string
	genre: string

    noteData: NoteDatum[]
    noteDataArray: number[][]
    tabData: number[][]

	capo: number
    tuning: number[]
    w: number
    
	generateTime: number
    score: number
    
    easiness: number
    recall: number

    timeSignatures: TimeSignature[]
}

export interface SaveData {
    songs: Song[]
}
    
export const defaultSaveData:SaveData = {
    songs: [
		{
			date: '2021/10/29',
			title: '主よ人の望みよ、喜びよ',
			genre: 'classic',
			capo: 12,
            w: 0.9,
			tuning: [0,0,0,0,0,0],
			generateTime: 22,

            noteDataArray: [],
			noteData: [],
			tabData: [],
            timeSignatures: [{
                measures: 0,
                ticks: 0,
                timeSignature: [1,4]
            }],

            score: 0.8,
            easiness: 0.8,
            recall: 0.8
		}
	]
}