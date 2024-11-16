import React from "react";
import { countStore } from "../../store/countStore"; // import default export without curly braces
import { productStore } from "../../store/productStore"; // import default export without curly braces
import { Button, Row, Col } from "antd";
import "./styleProduct.css";
import ProductCard from "../../component/product/ProductCard";

function ProductPage() {
  const { count, increase, decrease, reset, update_count } = countStore(); // call countStore() to access Zustand store
  const { list, handleWishlist } = productStore(); // call productStore() to get the product list

  const onaddtobag = (item) => {
    // alert("Hello")
    alert(JSON.stringify(item));
  };
  const onwishlist = (item) => {
    // alert("Hello")
    // alert(JSON.stringify(item));
    handleWishlist(item);
  };
  return (
    <div>
      <h1>ProductPage</h1>
      {/* <h1>{count}</h1> */}
      {/* <h1>{list.length}</h1> */}
      <Row
        gutter={[
          { xs: 2, sm: 4, md: 6, lg: 12, xl: 16 },
          { xs: 2, sm: 4, md: 6, lg: 12, xl: 16 },
        ]}
      >
        {list?.map((item, index) => (
          <Col key={index} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <ProductCard
              {...item}
              description={item.des}
              onaddtobag={() => onaddtobag(item)}
              // onwishlist={() => onwishlist(item)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductPage;
