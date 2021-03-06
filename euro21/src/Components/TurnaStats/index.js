import { Disclosure } from '@headlessui/react'
import { ChartBarIcon } from '@heroicons/react/outline'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { useParams } from 'react-router'
import { useGetParticipantsCount } from '../../hooks/useGetParticipantsCount'
import { useGetTurnaName } from '../../hooks/useGetTurnaName'
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useGetLeaderBoard } from '../../hooks/useGetLeaderboard'
import Leaderboard from './Leaderboard'
import Loader from '../Loader'
import { useGetLeaderBoardPos } from '../../hooks/useGetLeaderboardPos'
import { useStoreState } from 'easy-peasy'
import { useGetUserPoints } from '../../hooks/useGetUserPoints'
const TurnaStats = () => {
  const { id } = useParams()
  const { userdata } = useStoreState(state => state.user)
  const turnaName = useGetTurnaName(id)
  const participants = useGetParticipantsCount(id)
  const leaderboard = useGetLeaderBoard(id)
  
    let [isOpen, setIsOpen] = useState(false)

    const PosAndPoints = ({id, userId}) => {
      const pos = useGetLeaderBoardPos(id, userId)
      const points = useGetUserPoints(id, userId)
      return (
        <div><span className='text-lg'>{pos+1}</span>. / {points}pts</div>
      )
    }
    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
  
  return ( 

    <div className="w-full">
<>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
  
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
                    Leaderboard
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="space-y-2 text-gray-800">
                      {leaderboard ? leaderboard.map(({data:{userId, points}}, i) => (
                        <Leaderboard key={userId} pos={i+1} name={userId} points={points} avatar={userId}/>
                      )): <Loader />}
                    </div>
                  </div>
  
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-100 border border-transparent rounded-md bg-uefa-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-uefa-dark"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
      <div className="w-full p-2 bg-white rounded-2xl">
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-uefa-dark hover:bg-uefa-light focus:outline-none focus-visible:ring focus-visible:ring-uefa-dark focus-visible:ring-opacity-75">
                <div className='flex uppercase'><ChartBarIcon className='w-5 h-5'/>&nbsp;{turnaName}&nbsp;<span className='lowercase'>stats</span></div>
                <ChevronUpIcon
                  className={`${
                    open ? ' rotate-180' : ''
                  } w-5 h-5 text-gray-100 transform ease-in-out `}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className='space-y-2'>
                  <div className='flex'>
                    <div className='flex-1'>My points and position</div>
                    {/* <div><span className='text-lg'>{pos+1}</span>. with {points}pts</div> */}
                    {userdata ? <PosAndPoints userId={userdata.uniqueId} id={id}/> : 'Loading'}
                  </div>
                  <div className='flex'>
                    <div className='flex-1'>Participants</div>
                    <div>{participants}</div>
                  </div>
                </div>
                <button
                  onClick={openModal}
                  className='w-full py-1.5 mt-6 text-white uppercase rounded-md bg-gray-700 hover:bg-gray-600 border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800'>Leaderboard</button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
 
export default TurnaStats;