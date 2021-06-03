import { useHistory } from 'react-router-dom';
import AppHeader from '../AppHeader';
import BottomNav from '../Nav/BottomNav';

const Wrapper = ({ children }) => {
  const history = useHistory()
  const currentLocation = history.location.pathname
  const inAppStyles = "container px-2 mx-auto mt-24 mb-24 md:max-w-6xl text-darkBlue" 
  return ( 
    <div className={currentLocation === '/' ? '' : inAppStyles}>
      {currentLocation === '/' ? <></> : (<AppHeader />)}
      {children}
      {currentLocation === '/' ? <></> : (<BottomNav />)}
    </div>
   );
}
 
export default Wrapper;