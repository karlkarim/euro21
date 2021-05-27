const Wrapper = ({ children }) => {
  return ( 
    <div className="container px-6 mx-auto mt-24 mb-24 md:max-w-6xl text-darkBlue">
      {children}
    </div>
   );
}
 
export default Wrapper;