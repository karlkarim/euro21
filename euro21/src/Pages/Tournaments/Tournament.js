import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PredictionCard from "../../Components/Cards/PredictionCard";
import Loader from "../../Components/Loader";
import http from "../../http";

const Tournament = () => {
  const [pickNeeded, setPickNeeded] = useState(null);
  const [matches, setMatches] = useState(null);
  const [matchToggle, setMatchToggle] = useState('needsPick');
  const [toggling, setToggling] = useState(false);
  const { userdata } = useStoreState(state => state.user)
  const { fetchPickNeeded } = useStoreActions(action => action.predictions)
  const { id } = useParams();
  const fetchTournaData = async (pickType) => {
    let predictedIds = [] 
    try {
      setToggling(true)
      const mathces = await http.get('/matches')
      const pred = await http.get('/predictions',{ params: {jsonata:`[$[data.userId="${userdata.uniqueId}"]]`}})
      pred.data.map(({data: { matchId }}) => (
        predictedIds.push(matchId)
      ))
      
      if(pickType === 'needsPick') {
        const pickNeeded = mathces.data.filter(match => !predictedIds.includes( match.uniqueId ) )
        setMatches(pickNeeded)
        setToggling(false)
      }
      if(pickType === 'picked') {
        const pred = await http.get('/predictions',{ params: {jsonata:`[$[data.userId="${userdata.uniqueId}"]]`}})
        setMatches(pred.data)
        setToggling(false)
      }
      return
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchTournaData(matchToggle);
  }, [matchToggle]);
  
  return (
    <div>
      <div className='flex justify-around mb-2'>
        
        <div
          onClick={() => setMatchToggle('needsPick')}
          className={`hover:bg-blue-200 cursor-pointer transition-all ease-in-out delay-75 border-b-2 border-white rounded-tl-md w-full p-1 text-center bg-blue-100 ${matchToggle === 'needsPick' ? 'border-blue-500 text-lg': ''}`}>Pick needed</div>
        <div
          onClick={() => setMatchToggle('picked')}
          className={`hover:bg-blue-200 cursor-pointer transition-all ease-in-out delay-75 border-b-2 border-white rounded-tr-md w-full p-1 text-center bg-blue-100 ${matchToggle === 'picked' ? 'border-blue-500 text-lg': ''}`}>Predicted</div>
      </div>
      <div className='grid gap-4 md:grid-cols-3'>
        {matches && !toggling ? matches.map(({uniqueId, data:{
          homeTeam,
          homeFlag,
          homeScore,
          awayTeam,
          awayFlag,
          awayScore,
          startingTime}}) => (
          <PredictionCard
          key={uniqueId}
          matchId={uniqueId}
          tournamentId={id}
          homeTeam={homeTeam}
          homeFlag={homeFlag}
          homeScore={homeScore ? homeScore : '-'}
          startingTime={startingTime}
          awayTeam={awayTeam}
          awayFlag={awayFlag}
          awayScore={awayScore ? awayScore : '-'}
        />
        )): (<div className='col-start-2 justify-items-center'>
        <Loader />
      </div>)}
      </div>
    </div>
  );
};

export default Tournament;
