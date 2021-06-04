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
        <TurnaCard key={uniqueId} onClick={handleClick(uniqueId)} turnaId={uniqueId} name={name} owner={owenerId} bckImg={'https://editorial.uefa.com/resources/0265-115492e629a4-d74889fdd6e9-1000/euro_fixtures.jpg'}/>
      )): 'Loading...'}
    </div>
  );
};

export default Tournament;
