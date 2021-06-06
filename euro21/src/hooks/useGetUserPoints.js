/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import http from '../http';
export const useGetUserPoints = (turnaId, userId) => {
  const [points, setPoints] = useState(0);
  const fetch = async () => {
    const query = await http.get(`/game-users`, {params: { jsonata: `$[data.gameId="${turnaId}" and data.userId="${userId}"]`}})
    setPoints(query.data.data?.points)
  }
  useEffect(() => {
    fetch()

  }, [turnaId]);
  return points
}