import Auth from '../../Components/Auth/index';
import party from '../../assets/party.svg'

//<Auth />

const Home = () => {
  return ( 
    <div>
    
    
    
        <div class="px-20 py-4">
          
           <div class=" max-w-lg">
               <img src={party} />
            </div>
            <div class="lg:2/6 xl:w-2/4 mt-7 lg:mt-10 lg:ml-16 text-left">
            <div class="text-4xl font-semibold text-gray-900 leading-none">Bring out your Oracle Power!</div>
            <div class="mt-3 text-xl font-light text-true-gray-500 antialiased">Join with others and win-win prizes</div>

        <Auth /> 
       
        </div>
        </div>
        </div>
  
    
    
    
    
   );
}
 
export default Home;