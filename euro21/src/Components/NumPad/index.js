import { useStoreActions, useStoreState } from "easy-peasy";

const NumPad = ({ selectedTeam }) => {
  const { setInitialNewScoreData } = useStoreActions(action => action.ui)
  const { initialNewScoreData } = useStoreState(state => state.ui)

  const handleScore = (scoreValue) => {
    const newData = {...initialNewScoreData}
    if(selectedTeam === initialNewScoreData.homeTeam) {
      newData.homeScore = scoreValue
      setInitialNewScoreData(newData)
    }
    if(selectedTeam === initialNewScoreData.awayTeam) {
      newData.awayScore = scoreValue
      setInitialNewScoreData(newData)
    }
  }
  
  return ( 
    <div className='grid grid-cols-3 gap-2 p-2 bg-gray-50'>
      <div onClick={() => handleScore(1)} className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>1</div>
      <div onClick={() => handleScore(2)} className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>2</div>
      <div onClick={() => handleScore(3)} className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>3</div>
      <div onClick={() => handleScore(4)} className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>4</div>
      <div onClick={() => handleScore(5)} className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>5</div>
      <div onClick={() => handleScore(6)} className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>6</div>
      <div onClick={() => handleScore(7)} className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>7</div>
      <div onClick={() => handleScore(8)} className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>8</div>
      <div onClick={() => handleScore(9)} className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>9</div>
    </div>
   );
}
 
export default NumPad;