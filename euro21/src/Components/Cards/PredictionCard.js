import Flag from 'react-world-flags'
import { useState } from 'react'
import moment from 'moment'
import { useStoreActions, useStoreState } from 'easy-peasy';
import http from '../../http';
import { useParams } from 'react-router-dom';
import OtherPredictions from './OtherPredictions';

const PredictionCard = ({ method, homeTeam, awayTeam, homeScore, awayScore, homeFlag, awayFlag, startingTime, matchId, tournamentId, predictionId }) => {
  
  const { setScoreFormOpen, setInitialNewScoreData, setOtherPredictions, setOtherPredictionsOpen } = useStoreActions((action) => action.ui)
  const { userdata } = useStoreState(state => state.user)
  // const [otherPredictions, setOtherPredictions] = useState(null);
  const { id } = useParams()
  // const predictionOwner = useGetOwner
  const handleNewScore = async () => {
      setInitialNewScoreData({method: 'new',startingTime, homeTeam, homeFlag, awayFlag, awayTeam, matchId, tournamentId, userId: userdata.uniqueId})
    setScoreFormOpen(true)
    
  }
  const handleEdit = (uniqueId) => {
    if(new Date(startingTime) <= Date.now()) {
      return GetOtherPredictions()
    }
    setInitialNewScoreData({method: 'edit', startingTime, homeScore, awayScore, homeTeam, homeFlag, awayFlag, awayTeam, uniqueId})
    setScoreFormOpen(true)
  }
  const checkOtherScores = () => {
    return GetOtherPredictions()
  }
  const GetOtherPredictions = async () => {
    // return
    console.log('matchId', matchId, '778d49bdf1b44b818416703eed423ded');
    try {
      const query = await http.get('/predictions', {params: {jsonata: `[$[data.tournamentId="${id}" and data.matchId="${predictionId}"]]`}})
      console.log('query', query.data);
      setOtherPredictions(query.data)
      setOtherPredictionsOpen(true)
    } catch (error) {
     console.error(error) 
    }
  }
  // console.log(otherPredictions)
  return ( 
    <div className={`relative grid items-center grid-cols-3 p-4 border border-gray-100 rounded-md shadow-md select-none ${new Date(startingTime) >= Date.now() ? '' :'bg-gray-400 opacity-75'}`}>
        
            {/* <OtherPredictions data={[]}/> */}
        <div className='flex flex-col items-center'>
          <Flag className='inline object-cover w-10 h-10 mr-2 border border-gray-100 rounded-full shadow-md' code={homeFlag} fallback={ <span className='text-xs text-red-600'>noFlag</span> }/>
          <div className='text-center'>{homeTeam}</div>
        </div>
        <div>
          <div className='relative flex flex-col items-center'>
            <div className='text-xs uppercase'>Starting date</div>
            <div className='text-xs'>{moment(startingTime).format('DD MMM - HH:mm')}</div>
            <div
              onClick={method === 'new' ? () => handleNewScore() : () => handleEdit(matchId)}
              className='mt-2 text-3xl '>
                {homeScore} : {awayScore}
            </div>
            {new Date(startingTime) <= Date.now() && <div className='text-blue-900 animate-pulse' onClick={() => checkOtherScores()}>Other Scores</div>}
                {method === 'new' && <div className='absolute text-xs text-uefa-light -bottom-3 animate-pulse'>Pick needed</div>}
          </div>
        </div>
        <div className='flex flex-col items-center'>
        <Flag className='inline object-cover w-10 h-10 mr-2 border border-gray-100 rounded-full shadow-md' code={awayFlag} fallback={ <span className='text-xs text-red-600'>noFlag</span> }/>
          <div className='text-center'>{awayTeam}</div>
        </div>
      </div>
   );
}
 
export default PredictionCard;