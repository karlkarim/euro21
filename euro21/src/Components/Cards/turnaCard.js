/* eslint-disable jsx-a11y/alt-text */
const TurnaCard = ({ name, owner, bckImg, onClick }) => {
  return (
    <div onClick={() => onClick()} className="flex flex-col max-w-lg space-y-2 bg-white shadow-md cursor-pointer md:max-w-sm rounded-xl">
      <img
        className="inline object-cover rounded-md rounded-b-none"
        src={bckImg}
        alt="motivation"
      />
      <div className="flex flex-col px-4 py-2">
        <div className="text-xl leading-relaxed tracking-tight md:text-2xl">
          {name}
        </div>
        <div className="flex">
          <div className="flex items-center flex-1 text-sm ">Created by&nbsp;<span className='font-medium'>{owner}</span></div>
          <div className="-space-x-6">
            <img
              className="relative z-30 inline object-cover w-10 h-10 border-2 border-white rounded-full "
              src="https://firebasestorage.googleapis.com/v0/b/photofeed-523c1.appspot.com/o/image%20(28).png?alt=media&token=67c726a1-98c7-43f9-a6e4-d3a5b680a43b"
            />
            <img
              className="relative z-20 inline object-cover w-10 h-10 border-2 border-white rounded-full"
              src="https://images.pexels.com/photos/2955305/pexels-photo-2955305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            />
            <img
              className="relative z-10 inline object-cover w-10 h-10 border-2 border-white rounded-full"
              src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnaCard;