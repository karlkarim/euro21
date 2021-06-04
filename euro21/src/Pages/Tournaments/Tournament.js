import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PredictionCard from "../../Components/Cards/PredictionCard";
import Loader from "../../Components/Loader";
import TurnaStats from "../../Components/TurnaStats";
import http from "../../http";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const Tournament = () => {
  const [matches, setMatches] = useState(null);
  const [matchToggle, setMatchToggle] = useState('needsPick');
  const [toggling, setToggling] = useState(false);
  const { userdata } = useStoreState(state => state.user)
  const { fetchGamesAgain } = useStoreState(state => state.ui)
  const [copied, setCopied] = useState(false);
  const { id } = useParams();
  const shareLink = `http://localhost:3000/app/tournament/invite/${id}`
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
  }, [matchToggle, fetchGamesAgain]);
  
  return (
    <div>
      <CopyToClipboard text={shareLink}
          onCopy={() => setCopied(true)}>
          <button className='text-sm text-uefa-light bg-gray-100 rounded-md px-1 py-0.5'>{copied ? 'Link copied!': 'Copy link to invite others'}</button>
        </CopyToClipboard>
        
      <TurnaStats />
      <div className='flex justify-around mb-2'>
        
        <div
          onClick={() => setMatchToggle('needsPick')}
          className={`hover:bg-uefa-light cursor-pointer text-gray-100 transition-all ease-in-out delay-75 border-b-2 border-white rounded-tl-md w-full p-1 text-center bg-uefa-dark ${matchToggle === 'needsPick' ? 'border-uefa-dark text-white bg-uefa-light text-lg': ''}`}>Pick needed</div>
        <div
          onClick={() => setMatchToggle('picked')}
          className={`hover:bg-uefa-light cursor-pointer text-gray-100 transition-all ease-in-out delay-75 border-b-2 border-white rounded-tr-md w-full p-1 text-center bg-uefa-dark ${matchToggle === 'picked' ? 'border-uefa-dark text-white bg-uefa-light text-lg': ''}`}>Predicted</div>
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
          method={matchToggle === 'needsPick' ? 'new' : 'edit'}
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
