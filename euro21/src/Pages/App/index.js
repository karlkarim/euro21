import Tournament from "../Tournaments/index"
import NewGameDialog from '../../Components/Dialogs/NewGame/index';

const MainApp = () => {
  return ( 
    <div className='grid gap-4'>
      <NewGameDialog />
      <Tournament />
    </div>
   );
}
 
export default MainApp;