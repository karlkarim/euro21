import { useGetOwner } from '../../hooks/useGetOwner';
import defaultAvtar from '../../assets/default.png'
import { useStoreState } from 'easy-peasy';
import { useGetAvatar } from '../../hooks/useGetAvatar';
const Leaderboard = ({name, points, pos, avatar}) => {

  const { userdata } = useStoreState(state => state.user)
  const { uniqueId } = userdata
  const username = useGetOwner(name)
  const pic = useGetAvatar(avatar)
  
  return ( 
    <div className={`flex py-2 px-3 rounded-full items-center border border-opacity-20 border-uefa-light shadow-md ${uniqueId === name ? 'bg-gradient-to-tr from-uefa-dark to-uefa-light text-white' : ''}`}>
      <div className='mr-3'>{pos}</div>
      <div><img className='object-cover w-10 h-10 mr-2 rounded-full' src={pic ? pic : defaultAvtar} alt=''/></div>
      <div className='flex-1 capitalize'>{username}</div>
      <div>{points ? points : '0'}<span className='text-xs'>pts</span></div>
    </div>
   );
}
 
export default Leaderboard;