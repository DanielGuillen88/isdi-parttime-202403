import React from 'react'
import './index.css'

const WasteWeight = ( { weight, handleWeightChange} ) => {

  return (
    <div className='InputWeightDiv'>
    <input
    className='InputWeight'
    value={weight}
    id='InputWeight'
    type='number'
    min="15"
    max="1999"
    name='weight'
    placeholder='Peso'
    onChange={handleWeightChange}
    />
    <h2 className='UnitWeight'>Kg.</h2>
    </div>
  )
}

export default WasteWeight