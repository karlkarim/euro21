import { action, thunk } from "easy-peasy";
import http from "../http";

export const predictions = {
  pickNeeded: null,
  predicted: null,

  setPickNeeded: action((state, newState) => {
    state.pickNeeded = newState
  }),
  fetchPickNeeded: thunk(async (action, payload) => {
    const predictedIds = []
    let mathcesTopredict = []
    try {
      const fetchPredictedIds = await http.get('/predictions', { params: {jsonata:`[$[data.userId="${payload}"]]`}})
      fetchPredictedIds.data.map(({data: { matchId }}) => (
        predictedIds.push(matchId)
      ))
      await Promise.all(
        predictedIds.map(async (id) => {
          const response = await http.get('/matches', {params: {jsonata: `[$[uniqueId!="${id}"]]`}})
          response.data.map(({uniqueId, data}) => ({
            uniqueId, ...data
          }))

          mathcesTopredict = response.data
        })
      )
      action.setPickNeeded(mathcesTopredict)
    } catch (error) {
     console.log(error) 
    }
  }),
  addNewPrediction: thunk(async (action, payload) => {
    try {
      const response = await http.post('/predictions', payload)
      if(response.status === 200){
        thunk.fetchPickNeeded(response.data.data.userId)
      }
    } catch (error) {
      
    }
  })
}
