import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { List_Null_Scrap, Navbar, Scrap_product, Product } from 'components';
import { userInfoState } from 'store';
import item from 'api/itemApi';

export default function Scrap_List() {
  const user_info = useRecoilValue(userInfoState);
  const like_item_id = user_info.likeitem_sets;
  const [productList, setProductList] = useState();

  const getProductList = async (item_id) => {
    console.log(item_id.likeitem);
    await item.getProductInfo(item_id.likeitem).then((res) => {
      // setProductList([...productList, res.data]);
      setProductList((productList) => [...productList, res.data]);
    });
  };

  useEffect(() => {
    like_item_id.forEach((item) => {
      getProductList(item);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <>
        <ul>{productList && productList.map((it) => <Scrap_product key={it.id} {...it} />)}</ul>
      </>
    </div>
  );
}
