const Wrapper = ({ children }) => {
  return ( 
    <div className="container px-2 mx-auto mt-24 mb-24 md:max-w-6xl text-darkBlue">
      {children}
    </div>
   );
}
 
export default Wrapper;