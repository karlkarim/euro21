import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TurnaCard from "../../Components/Cards/turnaCard";
import { db } from "../../firebase/config";
const Tournament = () => {
  const [tournaments, setTournaments] = useState(null);
  const { id } = useParams();
  const history = useHistory()
  const handleClick = (id) => () => {
    history.push(`/app/tournament/${id}`)
  }
  const fetchTournaData = async () => {
    try {
      const query = await db.collection("tournaments").where("participants", "array-contains", "karl").get();
      if (!query.empty) {
        const turna = query.docs.map(turna => ({
          id: turna.id,
          ...turna.data()
        }))
        setTournaments(turna);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchTournaData();
  }, []);
  return (
    <div className='grid gap-3 md:grid-cols-3'>
      {tournaments ? tournaments.map(({ id, name, ownerId, backImage }) => (
        <TurnaCard key={id} onClick={handleClick(id)} name={name} owner={ownerId} bckImg={backImage}/>
      )): 'Loading...'}
    </div>
  );
};

export default Tournament;
