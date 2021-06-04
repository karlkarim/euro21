import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import http from "../../../http";
import { useStoreActions, useStoreState } from 'easy-peasy';

const NewGameDialog = () => {
  const [name, setName] = useState('');
  const { userdata } = useStoreState((state) => state.user)
  const { newGameFormOpen } = useStoreState((state) => state.ui)
  const { setNewGameFormOpen } = useStoreActions((action) => action.ui)
  
  const handleClose = () => () => {
    setNewGameFormOpen(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await http.get('/matches')
      const addNewGame = await http.post('/tournaments', {owenerId:userdata.uniqueId, name})
      const addGameUsers = await http.post('/game-users', {
        userId: userdata.uniqueId,
        isOwner: true,
        gameId: addNewGame.data.uniqueId,
        points: 0
      })
      console.log(addNewGame, addGameUsers)
    } catch (error) {
      console.log(error)
    }
  }
  return ( 
    <Transition appear show={newGameFormOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleClose()}
        >
          <div className="min-h-screen px-4 text-center">
            
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create new Game
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"' />
                    
                  </form>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleClose()}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
   );
}
 
export default NewGameDialog;