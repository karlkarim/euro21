import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PredictionCard from "../../Components/Cards/PredictionCard";
import http from "../../http";

const Tournament = () => {
  const [matches, setMatches] = useState(null);
  const { id } = useParams();
  const fetchTournaData = async () => {
    try {
      const matches = await http.get('/matches')
        setMatches(matches.data)
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchTournaData();
  }, []);
  
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      
      {matches ? matches.map(({ data:{
        homeTeam,
        homeFlag,
        homeScore,
        awayTeam,
        awayFlag,
        awayScore,
        startingTime}}) => (
        <PredictionCard
        key={Math.random(100)}
        homeTeam={homeTeam}
        homeFlag={homeFlag}
        homeScore={homeScore ? homeScore : '-'}
        startingTime={startingTime}
        awayTeam={awayTeam}
        awayFlag={awayFlag}
        awayScore={awayScore ? awayScore : '-'}
      />
      )): 'Loading...'}
    </div>
  );
};

export default Tournament;
