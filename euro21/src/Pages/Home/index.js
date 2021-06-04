import Auth from '../../Components/Auth/index';
import party from '../../assets/party.svg'

const Home = () => {
  return ( 
  <div className='flex flex-col items-center mx-5 mt-20'>
      <div className="max-w-lg ">
        <img src={party} alt='prediction'/>
      </div>
      <div className="text-left lg:2/6 xl:w-2/4 mt-7 lg:mt-10 lg:ml-16">
        <div className="text-4xl font-semibold leading-none text-gray-900">Bring out your Oracle Power!</div>
        <div className="mt-3 text-xl antialiased font-light text-true-gray-500">Join with others and win-win prizes</div>
        <Auth /> 
      </div>
      <div className='fixed bottom-2 '>Made with ❤️ by Rain&Karl</div>
  </div>
  );
}
 
export default Home;