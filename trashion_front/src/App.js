import React, { useReducer, useRef, useEffect } from 'react';
import Authorized from 'routes/Authorized';
import Unauthorized from 'routes/Unauthorized';
import './App.css';

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
  const [data, dispatch] = useReducer(reducer, []);

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

  const onCreate = (date, title, content, price, size, condition, category, period) => {
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
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  //EDIT
  const onEdit = (targetId, date, title, content, price, size, condition, category, period) => {
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
