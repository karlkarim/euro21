import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PredictionCard from "../../Components/Cards/PredictionCard";
import { db } from "../../firebase/config";
const Tournament = () => {
  const [matches, setMatches] = useState(null);
  const { id } = useParams();
  const fetchTournaData = async () => {
    try {
      const query = await db.collection("matches").get();
      
      if (!query.empty) {
        const matches = query.docs.map(match => ({
          id: match.id,
          ...match.data()
        }))
        setMatches(matches);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchTournaData();
  }, []);
  console.log(matches)
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      {matches ? matches.map(({
        homeTeam,
        homeFlag,
        homeScore,
        awayTeam,
        awayFlag,
        awayScore,
        startingTime}) => (
        <PredictionCard
        key={Math.random(100)}
        homeTeam={homeTeam}
        homeFlag={homeFlag}
        homeScore={homeScore}
        startingTime={startingTime.seconds} //good! yes
        awayTeam={awayTeam}
        awayFlag={awayFlag}
        awayScore={awayScore}
      />
      )): 'Loading...'}
    </div>
  );
};

export default Tournament;
