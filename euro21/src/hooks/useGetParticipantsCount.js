/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import http from '../http';
export const useGetParticipantsCount = (turnaId) => {
  const [count, setCount] = useState('');
  const fetch = async () => {
    const query = await http.get(`/game-users`, {params: {jsonata: `[$count([$[data.gameId="${turnaId}"]])]`}})
    
    setCount(query.data)
  }
  useEffect(() => {
    fetch()

  }, [turnaId]);
  return count
}