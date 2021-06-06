/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import http from '../http';
export const useGetAvatar = (userId) => {
  const [avatar, setAvatar] = useState();
  const fetch = async () => {
    const query = await http.get(`/users?uniqueId=${userId}`)
    setAvatar(query.data.data.avatar)
  }
  useEffect(() => {
    fetch()

  }, [avatar]);
  return avatar
}