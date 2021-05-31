import { useStoreActions } from "easy-peasy";

const NumPad = () => {
  const { setInitialNewScoreData } = useStoreActions(action => action.ui)
//TODO
  const handleScore = () => {
    // setInitialNewScoreData({home})
  }
  return ( 
    <div className='grid grid-cols-3 gap-2 p-2 bg-gray-50'>
      <div className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>1</div>
      <div className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>2</div>
      <div className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>3</div>
      <div className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>4</div>
      <div className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>5</div>
      <div className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>6</div>
      <div className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>7</div>
      <div className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>8</div>
      <div className='p-6 text-3xl bg-white rounded-md cursor-pointer hover:bg-gray-100'>9</div>
    </div>
   );
}
 
export default NumPad;