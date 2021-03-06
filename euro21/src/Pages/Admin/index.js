/* eslint-disable no-mixed-operators */
import http from "../../http";
import { useEffect, useState } from 'react';
import moment from "moment";
import { Transition } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { useGetOwner } from '../../hooks/useGetOwner';

const AdminPage = () => {
  const [matches, setMatches] = useState(null);
  const [matchId, setMatchId] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [homeFlag, setHomeFlag] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayFlag, setAwayFlag] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [startingTime, setStartingTime] = useState('');
  const [stage, setStage] = useState('GroupStage');
  const [editing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [gameUsers, setGameUsers] = useState(null);
  
  
  function closeModal() {
    setIsOpen(false)
    setEditing(false)
    setStartingTime('')
    setMatchId('')
    setHomeFlag('')
    setHomeScore('')
    setHomeTeam('')
    setAwayFlag('')
    setAwayScore('')
    setAwayTeam('')
    setStage('')
  }
  const updateMatch = async () => {
    try {
      const query = await http.put('/matches', { 
        homeTeam,
        awayTeam,
        homeFlag,
        homeScore: homeScore === '' ? null : homeScore,
        awayFlag,
        startingTime,
        stage,
        awayScore: awayScore === '' ? null : awayScore
       }, {params: {uniqueId: matchId, strategy: 'merge'}})
       if(query.status === 201) {
         fetchMatches()
         setIsOpen(false)
       }
    } catch (error) {
      console.log(error)
    }
  }
  const newMatch = async () => {
    try {
      const query = await http.post('/matches', { 
        homeTeam,
        awayTeam,
        homeFlag,
        homeScore: homeScore === '' ? null : homeScore,
        awayFlag,
        startingTime,
        stage,
        awayScore: awayScore === '' ? null : awayScore
       })
       if(query.status === 201) {
         fetchMatches()
         setIsOpen(false)
         setEditing(false)
       }
    } catch (error) {
      console.log(error)
    }
  }
  const openModal = (stage, uniqueId, homeTeam, homeFlag, homeScore, awayTeam, awayFlag, awayScore, startingTime, editing) => {
    if(editing) {
      setEditing(true)
      setStage(stage)
      setStartingTime(startingTime)
      setMatchId(uniqueId)
      setHomeFlag(homeFlag)
      setHomeScore(homeScore)
      setHomeTeam(homeTeam)
      setAwayFlag(awayFlag)
      setAwayScore(awayScore)
      setAwayTeam(awayTeam)
    }
    setIsOpen(true)

  }
  const fetchMatches = async () => {
    try {
      const query = await http.get('/matches')
      setMatches(query.data)
    } catch (error) {
      console.error(error)
    }
  }
  const fetchGameUsers = async () => {
    try {
      const get = await http.get('/game-users',{params: {jsonata: `[$[data.gameId="b568cd277f854d6da95cccaf8ff2711b"]]`}})
      setGameUsers(get.data)
    } catch (error) {
      console.error(error)
    }
  }

  const calculate = async (userId, gameUsersId) => {
    try {
      const get = await http.get('/predictions',{params: {jsonata: `[$[data.tournamentId="b568cd277f854d6da95cccaf8ff2711b" and data.userId="${userId}"]]`}})
      get.data.map((prediction) => {
        const merged = get.data.map(userScore => ({
          userId:prediction.data.userId,
          predicted:{...userScore},
          real:{...matches.find(matchScore => matchScore.uniqueId === userScore.data.matchId)}
        }))
        return calc(merged, gameUsersId)
      })
    } catch (error) {
      console.error(error)
    }
  }
  async function calc(merged, gameUsersId) {
    let total = 0
    merged.forEach(({real, predicted}, i) => {
      if( real.data.homeScore === null || real.data.awayScore === null) {
        return total += 0
      }
      const realHomeWin = real.data.homeScore > real.data.awayScore
      const realAwayWin = real.data.awayScore > real.data.homeScore
      const realTie = real.data.homeScore === real.data.awayScore
      const predictedHomeWinWithOneSide = predicted.data.homeScore > predicted.data.awayScore && (real.data.homeScore === predicted.data.homeScore || real.data.awayScore === predicted.data.awayScore) 
      const predictedAwayWinWithOneSide = predicted.data.homeScore < predicted.data.awayScore && (real.data.homeScore === predicted.data.homeScore || real.data.awayScore === predicted.data.awayScore) 
      const userTie = predicted.data.homeScore === predicted.data.awayScore
      const winnerWithOneScore = (realHomeWin && predictedHomeWinWithOneSide) ||  (realAwayWin && predictedAwayWinWithOneSide) // 4 points
      const onlyWinner = ((realHomeWin && predicted.data.homeScore > predicted.data.awayScore) || (realAwayWin && predicted.data.awayScore > predicted.data.homeScore)) // 3 points
      const incorrectTie = (realTie && userTie) // 3 pints
      if (real.data.homeScore === predicted.data.homeScore && real.data.awayScore === predicted.data.awayScore) {
        total += 7
      } else {
        if(winnerWithOneScore) {
          return total +=4
        }
        if(onlyWinner) {
          return total += 3
        }
        if(incorrectTie) {
          return total += 3
        }
        if((real.data.homeScore === predicted.data.homeScore) || (real.data.awayScore === predicted.data.awayScore)) {
          return total += 1
        }
      }

    });
    await http.put('/game-users', {points:total}, {params: {uniqueId: gameUsersId, strategy: 'merge'}})
    fetchGameUsers()
    fetchMatches()
  }

  const CalcUsers = ({uniqueId, points, userId}) => {
    const username = useGetOwner(userId)
    return (
      <div className='flex items-center p-1 mx-2 mb-4 space-x-2 space-y-2 rounded-md shadow-md'>
          <div key={uniqueId}>{points} {username}</div>
          <button
            className='p-1 text-sm text-white rounded-md bg-uefa-dark'
            onClick={() => calculate(userId, uniqueId)}> calculate
          </button>
      </div>
    )
  }
  useEffect(() => {
    fetchMatches()
    fetchGameUsers()
  }, []);
  
  return ( 
    <div className='w-full'>
      {gameUsers?.map(({uniqueId, data: {points, userId}}) => (
        <CalcUsers key={uniqueId} uniqueId={uniqueId} points={points} userId={userId}/>
      ))}
      <div>
        <button
          onClick={() => openModal('uniqueId', homeTeam, homeFlag, homeScore, awayTeam, awayFlag, awayScore, startingTime, false)}
          className='p-1 text-sm text-white rounded-md bg-uefa-dark'>New Match&nbsp;+&nbsp;</button>
      </div>
      {matches ? matches.map(({uniqueId, data: {stage, homeTeam, awayTeam, homeScore, awayScore, startingTime, homeFlag, awayFlag}}) => (
        <div className='flex items-center p-1 space-x-2 space-y-2 text-sm shadow-md' key={uniqueId}>
          <div>{homeTeam} vs {awayTeam}</div>
          <div>{moment(startingTime).format('DD, MMM - HH:mm')}</div>
          <div className='flex-1'>{homeScore ? homeScore : 'N/A'} : {awayScore ? awayScore : 'N/A'}</div>
          <div>
            <button
              onClick={() => openModal(stage, uniqueId, homeTeam, homeFlag, homeScore, awayTeam, awayFlag, awayScore, startingTime, true)}
              className='p-1 text-sm text-white rounded-md bg-uefa-dark'>Edit</button>
          </div>
        </div>
      )) : 'loading'}
      <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
            

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {editing ? 'Edit match' : 'Add new match'}
                </Dialog.Title>
                <div className="mt-2">
                  <form>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='flex items-center justify-center w-full col-span-2'>
                        <label>Time</label>
                        <input value={startingTime} onChange={(e) => setStartingTime(e.target.value)} className='w-full p-1 border rounded-md'/>
                      </div>
                      <div className=''>
                        <div className='space-x-1 '>
                        <label>Home</label>
                        <input className='p-1 border rounded-md' value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)}/>
                        </div>
                        <div className='space-x-1 '>
                        <label>flag</label>
                        <input className='p-1 border rounded-md' value={homeFlag} onChange={(e) => setHomeFlag(e.target.value)}/>
                        </div>
                        <div className='space-x-1 '>
                        <label>score</label>
                        <input className='p-1 border rounded-md' value={homeScore} onChange={(e) => setHomeScore(e.target.value)}/>
                        </div>
                      </div>
                      <div>
                        <div className='space-x-1 '>
                        <label>Away</label>
                        <input className='p-1 border rounded-md' value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)}/>
                        </div>
                        <div className='space-x-1 '>
                        <label>Flag</label>
                        <input className='p-1 border rounded-md' value={awayFlag} onChange={(e) => setAwayFlag(e.target.value)}/>
                        </div>
                        <div className='space-x-1 '>
                        <label>Score</label>
                        <input className='p-1 border rounded-md' value={awayScore} onChange={(e) => setAwayScore(e.target.value)}/>
                        </div>
                      </div>
                      <div className='col-span-2 space-x-1'>
                        <label>Stage</label>
                        <input className='p-1 border rounded-md' value={stage} onChange={(e) => setStage(e.target.value)}/>
                        </div>
                    </div>

                  </form>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-uefa-dark hover:bg-uefa-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-uefa-dark"
                    onClick={editing ? () => updateMatch(): () => newMatch()}
                  >
                    {editing ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      </div>
    </div>
   );
}
 
export default AdminPage;