/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import http from '../http';
export const useGetLeaderBoardPos = (turnaId, userId) => {
  const [position, setPosition] = useState('');
  const fetch = async () => {
    const query = await http.get(`/game-users`, {params: { jsonata: `$sort($[data.gameId="${turnaId}"],function($l, $r) {
      $l.data.points <  $r.data.points
    })`}})
    const pos = query.data.findIndex(pos => pos.data.userId === userId)
    setPosition(pos)
  }
  useEffect(() => {
    fetch()

  }, [turnaId]);
  return position
}