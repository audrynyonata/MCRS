import axios from 'axios'

export const ADD_PROJECT = 'ADD_PROJECT'
export const READ_PROJECT = 'READ_PROJECT'

export const FETCH_PROJECT_BEGIN = 'FETCH_PROJECT_BEGIN'
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS'
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE'

export const fetchProviderBegin = () => ({
  type: FETCH_PROJECT_BEGIN
})

export const fetchProviderSuccess = projects => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: { projects }
})

export const fetchProviderFailure = errors => ({
  type: FETCH_PROJECT_FAILURE,
  payload: { errors }
})

export const addProvider = project => ({
  type: ADD_PROJECT,
  payload: { project }
})

export const readProviders = () => {
  return dispatch => {
    dispatch(fetchProviderBegin())
    return axios.get('/projects')
      .then(({ data }) => {
        // console.log(data)
        // console.log('readProviders','success')
        dispatch(fetchProviderSuccess(data))
      })
      .catch(error => dispatch(fetchProviderFailure(error)))
  }
}