import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PredictionCard from "../../Components/Cards/PredictionCard";
import { db } from "../../firebase/config";
const Tournament = () => {
  const [tournament, setTournament] = useState(null);
  const { id } = useParams();
  const fetchTournaData = async () => {
    try {
      const query = await db.collection("GroupStages").doc(id).get();
      console.log(query.data());
      if (query.exists) {
        setTournament(query.data());
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchTournaData();
  }, []);
  console.log(tournament)
  return (
    <div>
      {tournament ? (
        <PredictionCard
          homeTeam={tournament.homeTeam}
          homeFlag={tournament.homeFlag}
          homeScore={tournament.homeScore}
          startingTime={tournament.startDate.seconds}
          awayTeam={tournament.awayTeam}
          awayFlag={tournament.awayFlag}
          awayScore={tournament.awayScore}
        />
      ) : (
        "Loading...."
      )}
    </div>
  );
};

export default Tournament;
