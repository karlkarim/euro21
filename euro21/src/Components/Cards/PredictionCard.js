import Flag from 'react-world-flags'
const PredictionCard = ({ homeTeam, awayTeam, homeScore, awayScore, homeFlag, awayFlag, startingTime}) => {
  return ( 
    <div className='grid items-center grid-cols-3 p-4 bg-white border border-gray-100 rounded-md shadow-md select-none'>
        <div className='flex flex-col items-center'>
          <Flag className='inline object-cover w-10 h-10 mr-2 border border-gray-100 rounded-full shadow-md' code={homeFlag} fallback={ <span>Unknown</span> }/>
          <div className='text-center'>{homeTeam}</div>
        </div>
        <div>
          <div className='flex flex-col items-center'>
            <div className='text-xs uppercase'>Starting date</div>
            <div className='text-xs'>{startingTime}</div>
            <div
              onClick={() => alert('Siia ennustus asi')}
              className='mt-2 text-3xl'>{homeScore} : {awayScore}</div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
        <Flag className='inline object-cover w-10 h-10 mr-2 border border-gray-100 rounded-full shadow-md' code={awayFlag} fallback={ <span>Unknown</span> }/>
          <div className='text-center'>{awayTeam}</div>
        </div>
      </div>
   );
}
 
export default PredictionCard;