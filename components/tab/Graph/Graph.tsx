import React, { memo, useContext, useState } from 'react'
import { Finger } from '../type'
import PianoRoll from './PianoRoll/PianoRoll'
import { DebugNote } from '../type'
import Tablature from './Tablature'
import { Conductor } from './Conductor'
import { StateContext, DispatchContext } from '../../../pages'

interface Props {
    tuning: number[]
    fingers: Finger[]
    debugNotes: DebugNote[]
}

const Graph = (props: Props) => {
    const state = useContext(StateContext)
    const dispatch = useContext(DispatchContext)
    const [debugInfoFlag, setDebugInfoFlag] = useState(false)

    const chord = ['F', 'G', 'C']
    const div = {
        overflow: 'auto'
    }
    const table = {
        fontSize: '10pt',
    }
    const fixedRow = {
        position: 'sticky' as const,
        left: 0
    }

    // 運指を表示する
    const correctForm = <tr>
        <th style={fixedRow} className='table-secondary'>Fingering</th>
        {props.debugNotes.map((d,i)=>{
            if(d.correctForm === -1) return <td key={i}></td>
            const name = props.fingers[d.correctForm].name
            return <td key={i}>
                {name !== 'None' ? name : ''}
            </td>
            }
        )}            
    </tr>

    // 音ごとの難易度
    const easiness = <tr>
        <th style={fixedRow} className='table-secondary'>easiness</th>
        {props.debugNotes.map((dn, i)=><td key={i} className={dn.cost < 0.2 ? 'table-danger' : ''}>{dn.cost.toFixed(2)}</td>)}
    </tr>
    const recall = <tr>
        <th style={fixedRow} className='table-secondary'>recall</th>
        {props.debugNotes.map((dn, i)=><td key={i} className={dn.recall < 1.0 ? 'table-danger' : ''}>{dn.recall.toFixed(2)}</td>)}
    </tr>
    const score = <tr>
        <th style={fixedRow} className='table-secondary'>score</th>
        {props.debugNotes.map((dn, i)=><td key={i} className={dn.score < 0.63 ? 'table-danger' : ''}>{dn.score.toFixed(2)}</td>)}
    </tr>
    const cp = <tr>
        <th style={fixedRow} className='table-secondary'>(cp)</th>
        {props.debugNotes.map((dn, i)=><td key={i} className={dn.cp > 5.0 ? 'table-danger' : ''}>{dn.cp.toFixed(2)}</td>)}
    </tr>
    const cc = <tr>
        <th style={fixedRow} className='table-secondary'>(cc)</th>
        {props.debugNotes.map((dn, i)=><td key={i} className={dn.cc > 5.0 ? 'table-danger' : ''}>{dn.cc.toFixed(2)}</td>)}
    </tr>
    

    // const allTable = props.fingers.map((c, j)=><tr key={j}>
    //     <th>{c.name}</th>
    //     {props.points.map((d,i)=><td key={i} className={d[j] > 1.0 ? 'table-danger': ''}>{d[j]?.toFixed(1)}</td>)}            
    // </tr>)

    return <div style={div} className='bar'>
        <table style={table} className='table table-borderless'>
        <tbody>

		    <PianoRoll />
            <Conductor tickLength={state.noteDataArray.length} />

            <Tablature tuning={props.tuning} />

            {debugInfoFlag ? <>
            {correctForm}
            {score}
            {recall}
            {easiness}
            {cp}
            {cc}
            </>
            :<></>}
            <tr><td onClick={()=>setDebugInfoFlag(!debugInfoFlag)}>{debugInfoFlag ? 'hide' : 'show'}</td></tr>
        </tbody>
    </table>
    </div>
}

export default memo(Graph)