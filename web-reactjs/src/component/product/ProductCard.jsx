import React, { useState, useCallback } from "react";
import "./styleProductCard.css";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, message, Tag } from "antd";
import { productStore } from "../../store/productStore";
import config from "../../util/config";

const ProductCard = ({
  id,
  image,
  product_name,
  quantity,
  wishlist,
  discount,
  description,
  price,
  status,
  categories,
  brands,
  onaddtobag,
}) => {
  // Calculate the discounted price
  const finalPrice = discount
    ? (price - (price * discount) / 100).toFixed(2)
    : price;
  const { list, handleWishlist } = productStore();

  const onwishlist = () => {
    // alert("Hello")
    // alert(JSON.stringify(item));
    const param = {
      id: id,
      wishlist: wishlist,
    };
    handleWishlist(param);
  };
  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={config.image_path + image}
          alt={product_name}
          loading="lazy"
          className="product-image-content"
        />
        <button
          className="wishlist-icon"
          // onClick={toggleWishlist}
          // aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlist ? (
            <HeartFilled onClick={onwishlist} style={{ color: "red" }} />
          ) : (
            <HeartOutlined onClick={onwishlist} style={{ color: "red" }} />
          )}
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product_name}</h3>
        <p className="product-description">
          {brands} | {categories}
        </p>
        <p className="">{description}</p>
        <p className="">
          Status :{" "}
          {status == 1 ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="red">Inactive</Tag>
          )}{" "}
          | Quantity :{" "}
          <Tag color={quantity > 0 ? "green" : "red"}>{quantity}</Tag>
        </p>

        <div className="price-container">
          {discount ? (
            <>
              <del className="original-price">${price}</del>
              <span className="discount">-{discount}%</span>
              <span className="final-price">${finalPrice}</span>
            </>
          ) : (
            <span className="final-price">${price}</span>
          )}
        </div>

        <Button
          className="add-to-cart-button"
          type="primary"
          onClick={onaddtobag}
        >
          Add to Cart
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
