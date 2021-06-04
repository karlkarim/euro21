/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import http from '../http';
export const useGetTurnaName = (turnaId) => {
  const [turna, setTurna] = useState('');
  const fetch = async () => {
    const query = await http.get(`/tournaments?uniqueId=${turnaId}`)
    setTurna(query.data.data?.name)
  }
  useEffect(() => {
    fetch()

  }, [turnaId]);
  return turna
}