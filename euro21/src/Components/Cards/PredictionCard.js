import Flag from 'react-world-flags'
import moment from 'moment'
import { useStoreActions, useStoreState } from 'easy-peasy';

const PredictionCard = ({ method, homeTeam, awayTeam, homeScore, awayScore, homeFlag, awayFlag, startingTime, matchId, tournamentId }) => {
  
  const { setScoreFormOpen, setInitialNewScoreData } = useStoreActions((action) => action.ui)
  const { userdata } = useStoreState(state => state.user)

  const handleNewScore = async () => {
      setInitialNewScoreData({method: 'new',startingTime, homeTeam, homeFlag, awayFlag, awayTeam, matchId, tournamentId, userId: userdata.uniqueId})
    setScoreFormOpen(true)
    
  }
  const handleEdit = (uniqueId) => {
    setInitialNewScoreData({method: 'edit', startingTime, homeScore, awayScore, homeTeam, homeFlag, awayFlag, awayTeam, uniqueId})
    setScoreFormOpen(true)
  }
  return ( 
    <div className={`grid items-center grid-cols-3 p-4 border border-gray-100 rounded-md shadow-md select-none ${new Date(startingTime) >= Date.now() ? '' :'bg-gray-400 opacity-75'}`}>
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