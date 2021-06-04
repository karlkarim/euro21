import { UserCircleIcon, UsersIcon } from "@heroicons/react/outline";
import { useGetOwner } from "../../hooks/useGetOwner";
import cat from '../../assets/default.png'
import { useGetParticipantsCount } from '../../hooks/useGetParticipantsCount';
/* eslint-disable jsx-a11y/alt-text */
const TurnaCard = ({ name, owner:ownerId, bckImg, onClick, turnaId }) => {
  const owner = useGetOwner(ownerId)
  const participants = useGetParticipantsCount(turnaId)
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
          <div className="flex items-center space-x-1 text-uefa-dark">
            <div>{participants}</div>
            <UsersIcon className='w-4 h-4'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnaCard;