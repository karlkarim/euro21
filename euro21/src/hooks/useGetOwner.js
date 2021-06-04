/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import http from '../http';
export const useGetOwner = (ownerId) => {
  const [owner, setOwner] = useState('');
  const fetch = async () => {
    const query = await http.get(`/users?uniqueId=${ownerId}`)
    setOwner(query.data.data.username)
  }
  useEffect(() => {
    fetch()

  }, [ownerId]);
  return owner
}