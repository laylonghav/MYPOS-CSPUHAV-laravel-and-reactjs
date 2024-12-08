import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Spin } from "antd";
import { profileStore } from "../../store/profileStore";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { request } from "../../util/request";
import { Typography } from "antd";

const { Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setProfile, setAccessToken } = profileStore();
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [validatePW, setValidatePW] = useState({});
  const [validateUser, setValidateUser] = useState({});

  // Handle form submission
  const handleLogin = async (values) => {
    setLoading(true); // Show spinner
    try {
      const params = {
        email: values.username,
        password: values.password,
      };

      const response = await request("login", "post", params);
      console.log("Login :", response);
      if (response && !response.errors) {
        setAccessToken(response.access_token);
        setProfile(response.user);
        console.log(response.user.profile);
        message.success("Logged in successfully!");
        navigate("/");
      } else {
        // message.error(res.message);
        console.log("Error obj :", response.errors);

        if (
          response.errors.help !== "User not found" &&
          response.errors.help === "Incorrect password"
        ) {
          setValidatePW(response.errors);
        } else {
          setValidatePW({});
        }

        if (
          response.errors.help === "User not found" &&
          response.errors.help !== "Incorrect password"
        ) {
          setValidateUser(response.errors);
        } else {
          setValidateUser({});
        }
        setLoading(false); // Stop loading
        message.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      message.error("Login failed. Please check your connection.");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div
      className="bg-gray-100 py-10 px-5 rounded-md"
      style={{
        maxWidth: 450,
        margin: "200px auto",
        textAlign: "center",
      }}
    >
      <h2 className="font-bold text-2xl">Login</h2>

      {/* Wrap the Form with a Spin component */}
      <Spin spinning={loading}>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          layout="vertical"
          style={{ textAlign: "left" }}
        >
          {/* Username Field */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please enter your username!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
            {...validateUser}
          >
            <Input
              allowClear
              prefix={<UserOutlined />}
              placeholder="Enter your email"
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
            {...validatePW}
          >
            <Input.Password
              allowClear
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          {/* Remember Me */}
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>

      {/* Register Link */}
      <Text>
        Don't have an account?{" "}
        <Link to="/register" className="font-bold text-blue-500">
          Register here
        </Link>
      </Text>
    </div>
  );
};

export default LoginPage;
