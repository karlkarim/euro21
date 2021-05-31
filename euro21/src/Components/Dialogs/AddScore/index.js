import { Fragment, useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Dialog, Transition } from "@headlessui/react";
import NumPad from "../../NumPad";
const NewScore = () => {
  const { initialNewScoreData } = useStoreState(state => state.ui)
  const { newScoreFormOpen } = useStoreState((state) => state.ui)
  const { setScoreFormOpen } = useStoreActions((action) => action.ui)
  const { homeTeam, awayTeam, homeScore, awayScore } = initialNewScoreData
  const handleClose = () => {
    setScoreFormOpen(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    
  }
  return (
    <div>
    <Transition appear show={newScoreFormOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => handleClose()}
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
                  className="flex justify-around p-1 text-lg font-medium leading-6 text-gray-900"
                >
                  <div>{homeTeam}</div> <span>vs</span> <div>{awayTeam}</div>
                </Dialog.Title>
                <div>
                  <div className='flex justify-around p-2 text-4xl'>
                    <div>{homeScore ? homeScore : '-'}</div>
                    {/* <div>:</div> */}
                    <div>{awayScore ? awayScore : '-'}</div>
                  </div>
                  <div className="flex justify-center w-full">
                    <NumPad />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      </div>
   );
}
 
export default NewScore;