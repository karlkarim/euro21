import { CogIcon, FireIcon, PlusCircleIcon } from "@heroicons/react/outline"

const BottomNav = () => {
    return ( 
      <nav className="fixed inset-x-0 bottom-0 flex items-center justify-between text-xs text-gray-900 uppercase bg-gray-100">
        <div className="block w-full px-3 py-3 text-center transition duration-300 hover:bg-gray-200 hover:text-gray-800">
            <FireIcon className='w-8 h-8 mx-auto mb-2'/>
        </div>
        <div className="block w-full px-3 py-3 text-center hover:bg-gray-200 hover:text-gray-800">
            <PlusCircleIcon className="w-10 h-10 mx-auto mb-2"/>
        </div>
        <div className="block w-full px-3 py-3 text-center hover:bg-gray-200 hover:text-gray-800">
            <CogIcon className="w-8 h-8 mx-auto mb-2"/>
        </div>
      </nav>
     );
}
 
export default BottomNav;