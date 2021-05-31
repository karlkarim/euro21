import BottomNav from "../../Components/Nav/BottomNav"
import Tournament from "../Tournaments/index"
import NewGameDialog from '../../Components/Dialogs/NewGame/index';
const MainApp = () => {
  return ( 
    <div className='grid gap-4'> Explore
      <NewGameDialog />
      <BottomNav/>
      <Tournament />
    </div>
    
    

   );
}
 
export default MainApp;