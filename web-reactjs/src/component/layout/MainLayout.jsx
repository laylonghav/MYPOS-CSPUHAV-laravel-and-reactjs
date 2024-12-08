import "./styleMainLayout.css";
import { TbBrandProducthunt } from "react-icons/tb";

// Import FontAwesome and the specific icon you need
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons"; // Import faBars icon

import logo from "../../assets/Image/logo/Mylogo.png";
import React, { useEffect, useState } from "react";
import profile_image from "../../assets/Image/logo/Image_default.png";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  BarChartOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  CreditCardOutlined,
  IdcardOutlined,
  UserAddOutlined,
  SettingOutlined,
  SmileOutlined,
  ShoppingOutlined,
  ContainerOutlined,
  AppstoreOutlined,
  BranchesOutlined,
  PayCircleOutlined,
  DollarOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Dropdown, Image, Layout, Menu, Space, theme } from "antd";
import { profileStore } from "../../store/profileStore";
import { Outlet, useNavigate } from "react-router-dom";
import Search from "antd/es/transfer/search";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import config from "../../util/config";
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
  getItem("Dashboard", "/", <DashboardOutlined />),
  getItem("POS", "/pos", <ShoppingCartOutlined />),
  getItem("Order", "/order", <FileTextOutlined />),
  getItem("Reports", "report", <BarChartOutlined />, [
    getItem("Top Sale", "/report/top_sale", <ShoppingOutlined />),
    getItem("Order", "/report/order", <FileTextOutlined />),
    getItem("Purchase", "/report/purchase", <ContainerOutlined />),
    getItem("Expense", "/report/expense", <CreditCardOutlined />),
  ]),
  getItem("Inventory", "inventory", <AppstoreAddOutlined />, [
    getItem("Products", "/product", <AppstoreOutlined />),
    getItem("Category", "/category", <AppstoreOutlined />),
    getItem("Brand", "/brand", <TbBrandProducthunt />),
    getItem("Stock", "/stock", <DatabaseOutlined />),
  ]),
  getItem("Customer", "customer", <TeamOutlined />, [
    getItem("Customer", "/customer", <TeamOutlined />),
    getItem("Customer type", "/customer_type", <TeamOutlined />),
  ]),
  getItem("Expense", "expense", <CreditCardOutlined />, [
    getItem("Expenses", "/expense", <CreditCardOutlined />),
    getItem("Expense Types", "/expense_type", <PayCircleOutlined />),
  ]),
  getItem("Employee", "employee", <IdcardOutlined />, [
    getItem("Employee List", "/employee", <IdcardOutlined />),
    getItem("Payroll", "/payroll", <PayCircleOutlined />),
  ]),
  getItem("User", "/user", <UserAddOutlined />, [
    getItem("User List", "/user", <UserAddOutlined />),
    getItem("User Role", "/role", <UserAddOutlined />),
    getItem("Permission", "/permission", <SettingOutlined />),
  ]),
  getItem("Setting", "setting", <SettingOutlined />, [
    getItem("Language", "/lang", <GlobalOutlined />), // Updated icon for Language
    getItem("Currency", "/currency", <DollarOutlined />), // Updated icon for Currency
    getItem("Payment Method", "/payment_method", <PayCircleOutlined />),
    getItem("Province", "/province", <BranchesOutlined />),
  ]),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { profile, setProfile, logout } = profileStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate("/login");
    }
  }, [profile, navigate]);

  if (!profile) {
    // Avoid rendering the layout if the user is not logged in
    return null;
  }

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
    logout();
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
        <Space className="h-[80px]  bg-gray-100 flex justify-between items-center px-5">
          <Space className="flex gap-x-5 justify-center items-center">
            <div className="">
              <img className="w-[60px]" src={logo} alt="Mylogo" />
            </div>
            <div className="">
              <div className="">My-POS-CSPUHAV</div>
              <div className="">Computer & Phone Shop</div>
            </div>
            <div className="txtSeach">
              <Search placeholder="input search text" enterButton />
            </div>
          </Space>
          <div className="flex justify-center items-center  gap-3">
            <MdOutlineMarkEmailUnread className="text-5xl" />
            <IoIosNotifications className="text-5xl" />
            <div className="flex flex-col gap-y-1">
              <div className="text-lg font-bold font-mono">{profile?.name}</div>
              <div className="">{profile?.profile?.type}</div>
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
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                
                <Image
                  preview={{
                    mask: (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          color: "#fff",
                          fontSize: "24px",
                          background: "rgba(0, 0, 0, 0)",
                        }}
                      >
                        <EyeOutlined /> {/* Eye Icon */}
                        
                      </div>
                    ),
                  }}
                  className="w-[100%] overflow-hidden rounded-full"
                  src={
                    profile?.profile?.image == null
                      ? profile_image
                      : config.image_path + profile?.profile?.image
                  } //profile?.profile.image
                  alt="Profile"
                />
              </div>
            </Dropdown>
          </div>
        </Space>
        <Content
          className="h-[calc(100vh-100px)] overflow-y-auto"
          style={{
            margin: "10px",
          }}
        >
          <div
            className="p-4 min-h-[calc(100vh-100px)]"
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

{
  /* <div className="navbar">
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
</div>; */
}
