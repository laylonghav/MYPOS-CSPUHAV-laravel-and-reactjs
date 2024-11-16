import "./styleMainLayout.css";
// Import FontAwesome and the specific icon you need
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons"; // Import faBars icon

import logo from "../../assets/Image/logo/Mylogo.png";
import profile_image from "../../assets/Image/logo/laylonghav.jpg";
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SmileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import Search from "antd/es/transfer/search";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("DashDashaboard", "/", <PieChartOutlined />),
  getItem("Customer", "/customer", <DesktopOutlined />),
  getItem("Supplier", "/supplier", <DesktopOutlined />),
  getItem("About", "/about", <DesktopOutlined />),
  getItem("Product", "/product", <DesktopOutlined />),
  getItem("Role", "/role", <DesktopOutlined />),
  getItem("User", "/user", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const MainLayout = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const itemDroptown = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Change Password",
      icon: <SmileOutlined />,
      // disabled: true,
    },
    {
      key: "logout",
      danger: true,
      label: "LOGOUT",
    },
  ];

    const LOGOUT = () => {
      navigate("/login");
    };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={(item) => navigate(item.key)}
        />
      </Sider>
      <Layout>
        <div className="admin-header">
          <div className="admin-header-g1">
            <div className="">
              <img className="Admin-logo" src={logo} alt="Mylogo" />
            </div>
            <div className="Brand">
              <div className="txt-brand-name">My-POS-CSPUHAV</div>
              <div className="brandName">Computer & Phone Shop</div>
            </div>
            <div className="txtSeach">
              <Search placeholder="input search text" enterButton />
            </div>
          </div>
          <div className="admin-header-g2">
            <MdOutlineMarkEmailUnread className="icon-notify" />
            <IoIosNotifications className="icon-email" />
            <div className="Lavel_User">
              <div className="txt-user-name">{}</div>
              <div className="">{}</div>
            </div>
            {/* <div className="btnLOGOUT">
              {profile && (
                <Button type="primary" onClick={LOGOUT}>
                  LOGOUT
                </Button>
              )}
            </div> */}
            <Dropdown
              menu={{
                items: itemDroptown,
                onClick: (event) => {
                  if (event.key == "logout") {
                    LOGOUT();
                  }
                },
              }}
            >
              <img className="Profile-User" src={profile_image} alt="Profile" />
            </Dropdown>
          </div>
        </div>
        <Content
          style={{
            margin: "10px",
          }}
        >
          <div
            className="Admin-body"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;







// useEffect(() => {
//   const toggleButton = document.querySelector(".toggle");
//   const navList = document.querySelector(".nav-list");
//   const navLinks = document.querySelectorAll(".nav-link");

//   // Toggle the 'active' class to show/hide the nav list
//   const handleToggle = () => {
//     navList.classList.toggle("active");
//   };

//   // Add click event to each nav link to mark it as active
//   const handleNavLinkClick = (link) => {
//     // Remove 'active' class from all links
//     navLinks.forEach((item) => item.classList.remove("active"));
//     // Add 'active' class to the clicked link
//     link.classList.add("active");
//   };

//   toggleButton.addEventListener("click", handleToggle);

//   navLinks.forEach((link) => {
//     link.addEventListener("click", () => handleNavLinkClick(link));
//   });

//   // Clean up event listeners when component unmounts
//   return () => {
//     toggleButton.removeEventListener("click", handleToggle);
//     navLinks.forEach((link) =>
//       link.removeEventListener("click", handleNavLinkClick)
//     );
//   };
// }, []);

{/* <div className="navbar">
  <div className="nav-logo">
    <div className="logo">
      <img src={logo} alt="nav-logo" />
    </div>
    <div className="brand-name">
      <div className="name">
        <h1>CS PUHAV</h1>
      </div>
      <div className="description">Building webpage</div>
    </div>
  </div>
  <button className="toggle">
    <FontAwesomeIcon icon={faBars} /> 
  </button>
  <ul className="nav-list">
    <li className="nav-link">
      <Link to="/">Home</Link>
    </li>
    <li className="nav-link">
      <Link to="/drink">Drink</Link>
    </li>
    <li className="nav-link">
      <Link to="/foods">Foods</Link>
    </li>
    <li className="nav-link">
      <Link to="/category">Category</Link>
    </li>
    <li className="nav-link">
      <Link to="/service">Service</Link>
    </li>
    <li className="nav-link">
      <Link to="/about">About Us</Link>
    </li>
  </ul>
</div>; */}