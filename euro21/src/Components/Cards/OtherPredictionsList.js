import { useGetOwner } from "../../hooks/useGetOwner";

const   OtherPredictionsList = ({data}) => {
  const { userId, homeScore, awayScore, awayTeam, homeTeam } = data
  const username = useGetOwner(userId)
  return ( 
    <div className='flex'>
      <div className='flex-1 capitalize'>{username}</div>
      <div className='flex'>{homeTeam} <div className='mx-2 text-uefa-dark'>{homeScore}</div></div>
      <div className='flex'><div className='mx-2 text-uefa-dark'>{awayScore}</div> <div className=''>{awayTeam}</div></div>
    </div>
   );
}
 
export default OtherPredictionsList;