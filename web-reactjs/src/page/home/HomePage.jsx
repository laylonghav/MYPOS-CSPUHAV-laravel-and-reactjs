import React from "react";
import { countStore } from "../../store/countStore";
import { Button, Col, Row } from "antd";
import { productStore } from "../../store/productStore";
import { profileStore } from "../../store/profileStore";
import ProductCard from "../../component/product/ProductCard";

function HomePage() {
  const { count, increase, decrease, reset, update_count } = countStore(); // call countStore() to access Zustand store
  const { list } = productStore();
  const { permission } = profileStore();
  const newlist = [list[0], list[1], list[2], list[3]];

  return (
    <div>
      <h1>HomePage</h1>
      <h1>{count}</h1>
      <h1>
        {permission?.map((item, index) => (
          <div key={index}>
            {" "}
            {item.name} : {item.web_route_key}
          </div>
        ))}
      </h1>
      <Button onClick={() => increase()}>+</Button>
      <Button onClick={() => decrease()}>-</Button>{" "}
      {/* corrected the function name */}
      <Button onClick={() => reset()}>Reset</Button>
      <Button onClick={() => update_count(10)}>Update</Button>{" "}
      {/* You might need to pass a value */}
      <Row
        gutter={[
          { xs: 4, sm: 6, md: 12, lg: 18, xl: 28 },
          { xs: 4, sm: 6, md: 12, lg: 18, xl: 28 },
        ]}
      >
        {newlist?.map((item, index) => (
          <Col sm={24} md={12} lg={12} xl={8} xxl={6} key={index}>
            <ProductCard {...item} description={item.des} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
