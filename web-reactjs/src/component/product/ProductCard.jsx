import React, { useState, useCallback } from "react";
import "./styleProductCard.css";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import { productStore } from "../../store/productStore";

const ProductCard = ({
  id,
  image,
  name,
  description,
  price,
  discount,
  wishlist,
  onaddtobag,
}) => {
  // Calculate the discounted price
  const finalPrice = discount
    ? (price - (price * discount) / 100).toFixed(2)
    : price;
  const { list, handleWishlist } = productStore();
  // const [isFavorited, setIsFavorited] = useState(false);

  // // Toggle wishlist state with notification
  // const toggleWishlist = useCallback(() => {
  //   setIsFavorited((prev) => !prev);
  //   message.success(
  //     isFavorited ? "Removed from wishlist" : "Added to wishlist",
  //     2
  //   );
  // }, [isFavorited]);
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
          src={image}
          alt={name}
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
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>

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
