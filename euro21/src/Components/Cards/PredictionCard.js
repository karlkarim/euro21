import Flag from 'react-world-flags'
import { useStoreActions, useStoreState } from 'easy-peasy';

const PredictionCard = ({ homeTeam, awayTeam, homeScore, awayScore, homeFlag, awayFlag, startingTime, matchId, tournamentId }) => {
  console.log(awayFlag)
  const { setScoreFormOpen, setInitialNewScoreData } = useStoreActions((action) => action.ui)
  const { userdata } = useStoreState(state => state.user)
  const { initialNewScoreData } = useStoreState(state => state.ui)
  const handleNewScore = async () => {
    setInitialNewScoreData({homeTeam, awayTeam, matchId, tournamentId, userId: userdata.uniqueId})
    setScoreFormOpen(true)
    
  }
  return ( 
    <div className='grid items-center grid-cols-3 p-4 bg-white border border-gray-100 rounded-md shadow-md select-none'>
        <div className='flex flex-col items-center'>
          <Flag className='inline object-cover w-10 h-10 mr-2 border border-gray-100 rounded-full shadow-md' code={homeFlag} fallback={ <span className='text-xs text-red-600'>noFlag</span> }/>
          <div className='text-center'>{homeTeam}</div>
        </div>
        <div>
          <div className='relative flex flex-col items-center'>
            <div className='text-xs uppercase'>Starting date</div>
            <div className='text-xs'>{startingTime}</div>
            <div
              onClick={() => handleNewScore()}
              className='mt-2 text-3xl '>
                {homeScore} : {awayScore}
            </div>
                <div className='absolute text-xs text-red-400 -bottom-3'>Pick needed</div>
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