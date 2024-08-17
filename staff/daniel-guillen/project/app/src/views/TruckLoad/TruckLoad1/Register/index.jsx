import React from 'react'
//components
import WasteSelect from '../../../../components/WasteSelect'
import WasteContainer from '../../../../components/WasteContainer'
import WasteWeight from '../../../../components/WasteWeight'
import View from '../../../../components/core/View'
import michelangelo64 from '../../../../components/img/michelangelo64.png'
//handlers
import useWasteSelection from '../../../../handlers/useWasteSelection'
import useWasteContainer from '../../../../handlers/useWasteContainer'
import useWasteWeight from '../../../../handlers/useWasteWeight'
//logic
import submitDataActeco from '../../../../firebase/acteco/submitDataActeco'
import getWeekNumberYear from '../../../../logic/getWeekNumberYear'


const RegisterTruckLoad1 = () => {

  const { selectedWaste, handleWasteChange } = useWasteSelection()
  const { weight, handleWeightChange } = useWasteWeight()
  const { optionsContainer, handleOptionsContainer } = useWasteContainer()
  const { week, year } = getWeekNumberYear()
  const { saveData } = submitDataActeco(selectedWaste, weight, optionsContainer)

  return (
    <View>
    <div className='TruckLoadDiv'>

    <h1 className='RouteTitle'>CARGA TRAILER 1</h1>

      <form className='TruckLoadForm' onSubmit={(e) => { e.preventDefault(); saveData(); }}>
        
        <div className='TruckLoadSelectWaste'>
          
          <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
          
          <button className='SubmitButton' type='submit'><img className='SubmitButtonImage' src={michelangelo64} /></button>
       
        </div>

        <div className='TruckLoadSelectedContainer'>
         
          <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={handleOptionsContainer} />
        
        </div>

        <div className='WeightWeek'>
          
          <WasteWeight weight={weight} handleWeightChange={handleWeightChange} />
          
          <div className='WeekYearDiv'>

          <p>{week} / {year}</p>
          
          </div>

        </div>

      </form>
      
    </div>
    </View>
  )
}

export default RegisterTruckLoad1