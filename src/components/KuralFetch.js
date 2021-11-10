import React, { useReducer, useEffect, useState } from 'react'
import axios from 'axios'

const initialState = {
	loading: true,
	error: '',
	post: {},
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				post: action.payload,
				error: ''
			}
		case 'FETCH_ERROR':
			return {
				loading: false,
				post: {},
				error: 'Something went wrong!'
			}
		default:
			return state
	}
}

function KuralFetch() {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [kuralnum, setKuralNum] = useState(1);
	var number;

	const handleChange = event => {
        number = Number(event.target.value);
		console.log("Kural Number :" ,number);
    }

	const handleSubmit = event => {
		setKuralNum(number);
		event.preventDefault();
    }

	useEffect(() => {
		axios
			//.get(fetchKuralUrl({kural_num: num}))
			.get(`https://api-thirukkural.vercel.app/api?num=${kuralnum}`)
			.then(response => {
				dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
			})
			.catch(error => {
				dispatch({ type: 'FETCH_ERROR' })
			})
	}, [kuralnum])

	const GetKuralNum = ({onChange}) =>{
		return(
			<form onSubmit = {handleSubmit}>
				<label> <b>Enter the kural number :</b></label>
				<input type = "number"  className = 'kural-num-input' min = "1" max = "1330" onChange={onChange}/> 
				<input type = "submit" className = 'submit-button'/>
				
			</form>
		);
	};

	const DisplayKural = ({item}) => {
		return(
		<>	
			<div className = 'group'>
				<h4 className = 'head4'> {`[Section - ${item.sect_tam}]  [Chapter Group - ${item.chapgrp_tam}]  [Chapter - ${item.chap_tam}]`}</h4>
				<br/>
				<h3 className = 'head3'> {`Kural - ${kuralnum} in Tamil `}</h3>
				<p> {item.line1} </p>
				<p> {item.line2}</p>
				<h3 className = 'head3'> {`Meaning of the kural in Tamil`}</h3>
				<p> {item.tam_exp}</p>
			</div>
			<br/><br/>
			<div className = 'group'>
				<h4 className = 'head4'> {`[Section - ${item.sect_eng}] [Chapter Group - ${item.chapgrp_eng}] [Chapter - ${item.chap_eng}]`}</h4>
				<br />
				<h3 className = 'head3'> {`Kural - ${kuralnum} in English`}</h3>
				<p> {item.eng} </p>
				<h3 className = 'head3'> {`Meaning of the kural in English`}</h3>
				<p> {item.eng_exp}</p>
			</div>
			<br/><br/>
		</> 
		);
	}

	return (
		<div>			
			<GetKuralNum onChange={handleChange}> Enter Kural Number </GetKuralNum>
			<br />
			{state.loading ? ('Loading...') : (<DisplayKural item = {state.post}/>)}
			{state.error ? state.error : null}
		</div>
	)
}

export default KuralFetch