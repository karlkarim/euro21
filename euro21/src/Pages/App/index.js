import BottomNav from "../../Components/Nav/BottomNav"
import Tournament from "../Tournaments/index"
import NewGameDialog from '../../Components/Dialogs/NewGame/index';
import AppHeader from "../../Components/AppHeader";
const MainApp = () => {
  return ( 
    <div className='grid gap-4'>
      <NewGameDialog />
      <Tournament />
    </div>
    
    

   );
}
 
export default MainApp;