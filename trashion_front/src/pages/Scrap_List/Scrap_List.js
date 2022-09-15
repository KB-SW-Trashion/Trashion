import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from 'store';
import { Navbar, Scrap_product } from 'components';
import item from 'api/itemApi';

export default function Scrap_List() {
  const [productList, setProductList] = useState([]);
  const userAuth = useRecoilValue(authState);
  const user_id = userAuth.user_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await item.getItem();
        console.log(response.results);
        console.log(response.results[1].likeuser_sets.includes(String(user_id)));
        let res_filter = response.results.filter((i) => i.likeuser_sets.includes(String(user_id)));
        console.log(res_filter);
        setProductList(res_filter);
      } catch (err) {
        console.log('err: ', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <ul>{productList && productList.map((it) => <Scrap_product key={it.id} {...it} />)}</ul>
    </div>
  );
}
