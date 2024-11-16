import { create } from "zustand";
import image1 from "../assets/image/product/M3 MacBook Air 2024.jpg";
import image2 from "../assets/image/product/Apple MacBook Pro 16 (2023).jpg";
import image3 from "../assets/image/product/Apple MacBook Air 13 (2022).jpg";
import image4 from "../assets/image/product/Apple MacBook Pro 16-Inch (2021, M1 Max).jpg";
import image5 from "../assets/image/product/MacBook Air 2020.jpg";
import image6 from "../assets/image/product/Dell G16 (2024).jpg";
import image7 from "../assets/image/product/Asus Rog Dual Screen Laptop.jpg";
import image8 from "../assets/image/product/ASUS TUF A14.jpeg"; // Corrected to "TUF" instead of "TUP"
import image9 from "../assets/image/product/ASUS VIVOBOOK X1500KA 2024.jpg";

export const productStore = create((set) => ({
  list: [
    {
      id: 1,
      image: image1,
      name: "Macbook 2024",
      des: "8RAM 512SSD 14-inch",
      price: 2000,
      discount: 10,
      wishlist: 0,
    },
    {
      id: 2,
      image: image2,
      name: "Macbook 2023",
      des: "8RAM 256SSD 14-inch",
      price: 1500,
      discount: 10,
      wishlist: 1,
    },
    // {
    //   id: 103,
    //   image: image3,
    //   name: "Macbook 2022",
    //   des: "8RAM 1T-SSD 14-inch",
    //   price: 2200,
    // discount:10,
    // },
    {
      id: 4,
      image: image4,
      name: "Macbook 2021",
      des: "8RAM 512SSD 14-inch",
      price: 2300,
      discount: 10,
      wishlist: 1,
    },
    {
      id: 5,
      image: image5,
      name: "Macbook 2020",
      des: "16RAM 512SSD 14-inch",
      price: 2400,
      discount: 20,
      wishlist: 0,
    },
    {
      id: 6,
      image: image6,
      name: "Dell 2024",
      des: "16RAM 512SSD 15-inch",
      price: 1400,
      discount: 30,
      wishlist: 1,
    },
    {
      id: 7,
      image: image7,
      name: "ASUS ROG 2024",
      des: "16RAM 512SSD 17.3-inch",
      price: 1500,
      discount: 10,
      wishlist: 1,
    },
    {
      id: 8,
      image: image8,
      name: "ASUS TUF 2024", // Corrected the name
      des: "32RAM 1T-SSD 18-inch",
      price: 2400,
      discount: 40,
      wishlist: 0,
    },
    {
      id: 9,
      image: image9,
      name: "ASUS Vivobook 2024",
      des: "16RAM 512SSD 15-inch",
      price: 1500,
      discount: 15,
      wishlist: 1,
    },
  ],
  handleWishlist: (param) => {
    // alert(JSON.stringify(param))
    // set(() => ({
    //   list: [
    //     {
    //       id: 109,
    //       image: image9,
    //       name: "ASUS Vivobook 2024",
    //       des: "16RAM 512SSD 15-inch",
    //       price: 1500,
    //       discount: 15,
    //       wishlist: 1, // corrected from 'wishlist' to 'wishlist'
    //     },
    //   ],
    // })),
    set((pre) => {
      const indexProduct = pre.list?.findIndex((item) => item.id == param.id);

      pre.list[indexProduct].wishlist = !param.wishlist;
      return {
        list: pre.list,
      };
    });
  },
}));
