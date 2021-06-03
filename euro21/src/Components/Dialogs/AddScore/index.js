import { Fragment, useState, useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Dialog, Transition } from "@headlessui/react";
import NumPad from "../../NumPad";

import http from "../../../http";
const NewScore = () => {
  const { initialNewScoreData, fetchGamesAgain, newScoreFormOpen } = useStoreState(state => state.ui)
  const { setScoreFormOpen, setFetchNewGamesAgain } = useStoreActions((action) => action.ui)
  const { homeTeam, awayTeam, homeScore, awayScore } = initialNewScoreData
  const [teamSeleceted, setTeamSeleceted] = useState(homeTeam);
  
  const handleClose = async () => {
    setScoreFormOpen(false)
    if(!initialNewScoreData.homeScore || !initialNewScoreData.awayScore) return
    try {
      if(initialNewScoreData.method === 'new'){
        const addNewPrediction = await http.post('/predictions', {...initialNewScoreData})
        console.log(addNewPrediction.data.data.userId)
        if(addNewPrediction.status === 201){
          setFetchNewGamesAgain(!fetchGamesAgain)
        }
      }
      if(initialNewScoreData.method === 'edit') {
        const editPrediction = await http.put('/predictions', { homeScore, awayScore },
        { params: { strategy: "merge", uniqueId: initialNewScoreData.uniqueId } })
        console.log(editPrediction.data.data.userId)
        if(editPrediction.status === 201){
          setFetchNewGamesAgain(!fetchGamesAgain)
        }
      }
    } catch (error) {
      console.log(error)
    } 
  }
  useEffect(() => {
    if(initialNewScoreData) {
      setTeamSeleceted(homeTeam)
    }
  }, [initialNewScoreData, homeTeam, awayTeam]);
  console.log(homeScore, awayScore)
  return (
    <div>
    <Transition appear show={newScoreFormOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
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
                    <div onClick={() => setTeamSeleceted(homeTeam)}
                      className={`p-2 cursor-pointer ${teamSeleceted === homeTeam &&
                      'border-b-2 border-blue-400 '}`}>
                        {homeScore ? homeScore : '-'}
                    </div>
                    
                    <div onClick={() => setTeamSeleceted(awayTeam)}
                      className={`p-2 cursor-pointer ${teamSeleceted === awayTeam &&
                      'border-b-2 border-blue-400'}`}>
                        {awayScore ? awayScore : '-'}
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <NumPad selectedTeam={teamSeleceted}/>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                    onClick={() => handleClose()}
                  >
                    Save
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