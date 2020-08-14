import {useEffect, useReducer} from 'react';
import {AppState} from 'react-native';

const pageSize = 10;
const initialState = {data: [], listData: [], pageNumber: 1, isLoading: false};
const reducer = (state, action) => {
  const {payload, type} = action;
  switch (type) {
    case 'REQUEST':
      return {...state, isLoading: true};
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: payload,
        listData: payload.slice(0, pageSize),
      };
    case 'ADD_ITEM':
      return {
        ...state,
        listData: [
          {...payload, id: state.listData.length + 1},
          ...state.listData,
        ],
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        listData: [
          ...state.listData.filter((el) => el.id !== payload.id),
          payload,
        ],
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        listData: [...state.listData.filter((el) => el.id !== payload.id)],
      };
    case 'GET_NEXT_PAGE':
      console.log(state);
      return {
        ...state,
        listData: [
          ...state.listData,
          ...state.data.slice(
            state.pageNumber * pageSize,
            (state.pageNumber + 1) * pageSize,
          ),
        ],
        pageNumber: state.pageNumber + 1,
      };
    default:
      return state;
  }
};
export default useAppData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addItem = (item) => {
    dispatch({type: 'ADD_ITEM', payload: item});
  };
  const editItem = (item) => {
    dispatch({type: 'EDIT_ITEM', payload: item});
  };
  const deleteItem = (item) => {
    dispatch({type: 'DELETE_ITEM', payload: item});
  };
  const getNewPage = () => {
    dispatch({type: 'GET_NEXT_PAGE'});
  };
  const {listData} = state;
  useEffect(() => {
    dispatch({type: 'REQUEST'});
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => {
        console.log('timeout off');
        const appState = AppState.currentState;
        console.log(appState);
        response.json().then((data) => {
          dispatch({type: 'SUCCESS', payload: data});
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return {listData, addItem, editItem, deleteItem, getNewPage};
};
