const TurnaCard = () => {
  return (
    <div className="flex flex-col max-w-lg md:max-w-sm bg-white rounded-xl space-y-2 shadow-md cursor-pointer">
      <img
        className="inline rounded-md rounded-b-none object-cover"
        src="https://editorial.uefa.com/resources/0265-115492e629a4-d74889fdd6e9-1000/euro_fixtures.jpg"
        alt="motivation"
      />
      <div className="flex flex-col px-4 py-2">
        <div className="text-xl md:text-2xl tracking-tight leading-relaxed">
          Euro 2021 Ennustusmäng
        </div>
        <div className="flex">
          <div className="flex-1"></div>
          <div className="-space-x-6">
            <img
              className="relative z-30 inline object-cover w-10 h-10 border-2 border-white rounded-full "
              src="https://firebasestorage.googleapis.com/v0/b/photofeed-523c1.appspot.com/o/image%20(28).png?alt=media&token=67c726a1-98c7-43f9-a6e4-d3a5b680a43b"
              alt="Profile image"
            />
            <img
              className="relative z-20 inline object-cover w-10 h-10 border-2 border-white rounded-full"
              src="https://images.pexels.com/photos/2955305/pexels-photo-2955305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Profile image"
            />
            <img
              className="relative z-10 inline object-cover w-10 h-10 border-2 border-white rounded-full"
              src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Profile image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnaCard;
