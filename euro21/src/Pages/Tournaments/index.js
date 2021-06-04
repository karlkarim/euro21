import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TurnaCard from "../../Components/Cards/turnaCard";
import http from "../../http";

const Tournament = () => {
  const [tournaments, setTournaments] = useState(null);
  const history = useHistory()
  const handleClick = (id) => () => {
    history.push(`/app/tournament/${id}`)
  }
  const fetchTournaData = async () => {
    try {
      const query = await http.get('/tournaments')
        setTournaments(query.data);
      
    } catch (error) {
      console.log("error", error);
    }
  };
  
  useEffect(() => {
    fetchTournaData();
  }, []);
  console.log(tournaments)
  return (
    <div className='grid gap-3 md:grid-cols-3'>
      {tournaments ? tournaments.map(({ uniqueId, data: { name, owenerId } }) => (
        <TurnaCard key={uniqueId} onClick={handleClick(uniqueId)} turnaId={uniqueId} name={name} owner={owenerId} bckImg={'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190903171331-qatar-world-cup-emblem.jpg'}/>
      )): 'Loading...'}
    </div>
  );
};

export default Tournament;
