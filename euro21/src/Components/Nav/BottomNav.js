import { CogIcon, FireIcon } from "@heroicons/react/outline"
import { useStoreState } from "easy-peasy";
import { useHistory } from 'react-router-dom';

const BottomNav = () => {
    const history = useHistory()
    const { userdata } = useStoreState(state => state.user)
    return ( 
      <nav className="fixed inset-x-0 bottom-0 flex items-center justify-between text-xs text-gray-100 uppercase bg-uefa-dark">
        {userdata && (
            <>
            <div
            onClick={() => history.push('/app')}
            className="block w-full px-3 py-2 text-center transition duration-300 hover:bg-uefa-light hover:text-white">
            <FireIcon className='w-8 h-8 mx-auto mb-2'/>
        </div>
        {/* <div className="block w-full px-3 py-2 text-center hover:bg-uefa-light hover:text-white">
            <PlusCircleIcon className="w-10 h-10 mx-auto mb-2"/>
        </div> */}
        <div
            onClick={() => history.push('/app/profile')}
            className="block w-full px-3 py-2 text-center hover:bg-uefa-light hover:text-white">
            <CogIcon className="w-8 h-8 mx-auto mb-2"/>
        </div>
        </>
        )}
      </nav>
     );
}
 
export default BottomNav;