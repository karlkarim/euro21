import logo from '../../assets/logo.png'
import { useHistory } from 'react-router-dom';
const AppHeader = () => {
  const history = useHistory()
  return ( 
    <div className='fixed top-0 left-0 right-0 z-10 flex items-center justify-center p-2 shadow-md select-none bg-gradient-to-tr from-uefa-dark to-uefa-light'>
      <img onClick={() => history.push('/')} src={logo} className='w-14 h-14' alt='Uefa 2021'/>
    </div>
   );
}
 
export default AppHeader;