import Flag from 'react-world-flags'
const MainApp = () => {
  return ( 
    <div className='grid gap-4'>
      <div className='grid items-center grid-cols-3 p-4 bg-white border border-gray-100 rounded-md shadow-md select-none'>
        <div className='flex flex-col items-center'>
          <Flag className='inline object-cover w-10 h-10 mr-2 border border-gray-100 rounded-full shadow-md' code="cze" fallback={ <span>Unknown</span> }/>
          <div className='text-center'>Cezh Republic</div>
        </div>
        <div>
          <div className='flex flex-col items-center'>
            <div className='text-xs uppercase'>Starting date</div>
            <div className='text-xs'>01/03/2918 | 21:11</div>
            <div
              onClick={() => alert('Siia ennustus asi')}
              className='mt-2 text-3xl'>3 : 2</div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
        <Flag className='inline object-cover w-10 h-10 mr-2 border border-gray-100 rounded-full shadow-md' code="mkd" fallback={ <span>Unknown</span> }/>
          <div className='text-center'>North Macedonia</div>
        </div>
      </div>
    </div>
   );
}
 
export default MainApp;