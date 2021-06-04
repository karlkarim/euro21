/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import http from '../http';
export const useGetLeaderBoard = (turnaId) => {
  const [leaderboard, setLeaderboard] = useState('');
  const fetch = async () => {
    const query = await http.get(`/game-users`, {params: { jsonata: `$sort($[data.gameId="${turnaId}"],function($l, $r) {
      $l.data.points <  $r.data.points
    })`}})
    setLeaderboard(query.data)
  }
  useEffect(() => {
    fetch()

  }, [turnaId]);
  return leaderboard
}