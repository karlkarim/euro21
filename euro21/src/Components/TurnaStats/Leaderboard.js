import { useGetOwner } from '../../hooks/useGetOwner';
import defaultAvtar from '../../assets/default.png'
import { useStoreState } from 'easy-peasy';
const Leaderboard = ({name, points}) => {
  const { userdata } = useStoreState(state => state.user)
  const { avatar, uniqueId } = userdata
  const username = useGetOwner(name)

  return ( 
    <div className={`flex py-2 px-3 rounded-full items-center border border-opacity-20 border-uefa-light shadow-md ${uniqueId === name ? 'bg-gradient-to-tr from-uefa-dark to-uefa-light text-white' : ''}`}>
      <div><img className='object-cover w-6 h-6 mr-2 rounded-full' src={avatar ? avatar : defaultAvtar} alt=''/></div>
      <div className='flex-1'>{username}</div>
      <div>{points ? points : '0'}<span className='text-xs'>pts</span></div>
    </div>
   );
}
 
export default Leaderboard;