import { useGetOwner } from '../../hooks/useGetOwner';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useStoreState } from 'easy-peasy';
import OtherPredictionsList from './OtherPredictionsList';
import { useStoreActions } from 'easy-peasy';
import Loader from '../Loader';
const OtherPredictions = (data) => {
  
  const { otherPredictionsOpen ,otherPredictions } = useStoreState((state) => state.ui)
  const { setOtherPredictionsOpen } = useStoreActions((action) => action.ui)
  console.log('otherPredictions', otherPredictions);
  return ( 
    <>

    <Transition appear show={otherPredictionsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOtherPredictionsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          

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
                Other predictions
              </Dialog.Title>
              <div className="mt-2">
                {otherPredictions ? otherPredictions.map(({data}) => (
                  <OtherPredictionsList data={data }/>
                )): <Loader />}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-100 border border-transparent rounded-md bg-uefa-light hover:bg-uefa-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-uefa-dark"
                  onClick={() => setOtherPredictionsOpen(false)}
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
   );
}
 
export default OtherPredictions;