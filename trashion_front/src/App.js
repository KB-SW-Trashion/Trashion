import React, { useReducer, useRef, useEffect } from 'react';
import Authorized from 'routes/Authorized';
import Unauthorized from 'routes/Unauthorized';
import './App.css';
import { useRecoilState } from 'recoil';
import { authState } from 'store';
import authApi from 'api/authApi';
import { getCookie } from 'cookies-next';

//date, content, title, price, size, condition, category, period

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }

    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
      break;
    }

    default:
      return state;
  }

  localStorage.setItem('product', JSON.stringify(newState));
  return newState;
};

export const ProductStateContext = React.createContext();
export const ProductDispatchContext = React.createContext();

function App() {
  const [, setUser] = useRecoilState(authState);
  const [data, dispatch] = useReducer(reducer, []);

  const getUserInfo = async () => {
    await authApi.getUser().then((res) => {
      setUser({
        isLoggedIn: true,
        name: res.data.nick_name,
        email: res.data.email,
        social_img: res.data.social_img,
        user_id: res.data.id,
        access_token: getCookie('access_token'),
        refresh_token: getCookie('refresh_token'),
      });
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem('product');
    if (localData) {
      const productList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      if (productList.length >= 1) {
        dataId.current = parseInt(productList[0].id) + 1;
        dispatch({ type: 'INIT', data: productList });
      }
    }
  }, []);

  const dataId = useRef(0);

  // CREATE

  const onCreate = (date, title, content, price, size, condition, category, period, post_type) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        title,
        content,
        price,
        size,
        condition,
        category,
        period,
        post_type,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  //EDIT
  const onEdit = (targetId, date, title, content, price, size, condition, category, period, post_type) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        title,
        content,
        price,
        size,
        condition,
        category,
        period,
        post_type,
      },
    });
  };

  return (
    <div>
      <ProductStateContext.Provider value={data}>
        <ProductDispatchContext.Provider
          value={{
            onCreate,
            onEdit,
            onRemove,
          }}
        >
          <Authorized />
          <Unauthorized />
        </ProductDispatchContext.Provider>
      </ProductStateContext.Provider>
    </div>
  );
}

export default App;
