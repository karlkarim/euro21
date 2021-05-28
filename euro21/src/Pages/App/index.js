import PredictionCard from "../../Components/Cards/PredictionCard"
import TurnaCard from "../../Components/Cards/turnaCard"
import BottomNav from "../../Components/Nav/BottomNav"
import Tournament from "../Tournaments/index"
const MainApp = () => {
  return ( 
    <div className='grid gap-4'> Explore
      <BottomNav/>
      <Tournament />
    </div>
    
    

   );
}
 
export default MainApp;