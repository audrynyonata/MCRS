import axios from "axios";

export const ADD_PROJECT = "ADD_PROJECT";
export const READ_PROJECT = "READ_PROJECT";
export const FIND = "FIND";

export const FETCH_PROJECT_BEGIN = "FETCH_PROJECT_BEGIN";
export const FETCH_PROJECT_SUCCESS = "FETCH_PROJECT_SUCCESS";
export const FETCH_PROJECT_FAILURE = "FETCH_PROJECT_FAILURE";

export const FIND_BEGIN = "FIND_BEGIN";
export const FIND_SUCCESS = "FIND_SUCCESS";
export const FIND_FAILURE = "FIND_FAILURE";

export const fetchProjectBegin = () => ({
  type: FETCH_PROJECT_BEGIN
});

export const fetchProjectSuccess = projects => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: { projects }
});

export const fetchProjectFailure = errors => ({
  type: FETCH_PROJECT_FAILURE,
  payload: { errors }
});

export const findBegin = () => ({
  type: FIND_BEGIN
});

export const findSuccess = results => ({
  type: FIND_SUCCESS,
  payload: { results }
});

export const findFailure = errors => ({
  type: FETCH_PROJECT_FAILURE,
  payload: { errors }
});

export const addProject = project => ({
  type: ADD_PROJECT,
  payload: { project }
});

export const readProjects = () => {
  return dispatch => {
    dispatch(fetchProjectBegin());
    return axios
      .get("/projects")
      .then(({ data }) => {
        // console.log(data)
        // console.log('readProjects','success')
        dispatch(fetchProjectSuccess(data));
      })
      .catch(error => dispatch(fetchProjectFailure(error)));
  };
};

export const find = pid => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNvbXBhbnktYyIsImlhdCI6MTU2NDk2MjIxN30.wnzHu-EAp1xhNe1JVkP52nMuCAwadh88aMOgqfDrCUc";
  const data = {
    project: pid
  };
  const config = {
    headers: { Authorization: "Bearer " + token }
  };
  return dispatch => {
    dispatch(findBegin());
    return axios
      .post("/find", data, config)
      .then(({ data }) => {
        // console.log(data)
        // console.log('readProjects','success')
        dispatch(findSuccess(data));
      })
      .catch(error => dispatch(findFailure(error)));
  };
};
