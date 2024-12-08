import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { MdAdd, MdEdit, MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiCloudOn } from "react-icons/ci";
import profile from "../../assets/Image/logo/profile.png";
import { request } from "../../util/request";
import { dateClient, dateServer } from "../../util/helper";
import { useForm } from "antd/es/form/Form";
import { InfoCircleOutlined } from "@ant-design/icons";
import MainPage from "../../component/layout/MainPage";

function CustomerPage() {
  const [formrefe] = Form.useForm();
  useEffect(() => {
    getlist();
  }, []);
  const [state, setState] = useState({
    VisibleModule: false,
    loading: false,
    list: [],
    validate: {},
  });
  const [validate, setValidate] = useState({});
  const [filter, setFilter] = useState({
    txt_search: null,
    status: "",
  });

  const getlist = async () => {
    setState((pre) => ({
      ...pre,
      loading: true,
    }));
    let queryparam = "?page=1";
    if (filter.txt_search !== null && filter.txt_search !== "") {
      queryparam += "&txt_search=" + filter.txt_search;
    }
    if (filter.status !== null && filter.status !== "") {
      queryparam += "&status=" + filter.status;
    }
    const res = await request("customer" + queryparam, "get");
    // console.log(res);
    if (res && !res.errors) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        loading: false,
      }));
    } else {
      setState((pre) => ({
        ...pre,
        loading: false,
      }));
      if (res.errors?.message) {
        message.error(res.errors.message); // Show error to the user
        console.log("Error message:", res.errors.message); // Debug log
      } else {
        console.error("Unhandled error format:", res.errors);
      }
    }
  };

  const onClickAddbtn = () => {
    setState((prevState) => ({
      ...prevState,
      VisibleModule: true,
    }));
  };

  const oncloseModule = () => {
    formrefe.resetFields();
    setState((prevState) => ({
      ...prevState,
      VisibleModule: false,
    }));
    setValidate({});
  };

  const onFinish = async (item) => {
    // Prepare data with required id

    const data = {
      ...item,
      id: formrefe?.getFieldValue("id"),
      date_of_birth: dateServer(item.date_of_birth), 
    };

    setState((pre) => ({
      ...pre,
      loading: true,
    }));
    let url = "customer";
    let method = "post";
    if (formrefe.getFieldValue("id") !== undefined) {
      url += "/" + formrefe.getFieldValue("id");
      method = "put";
    }
    setState((p) => ({ ...p, loading: true }));
    const res = await request(url, method, data);
    console.log("check res in page:", res);
    if (res && !res.errors) {
      message.success(res.message);
      oncloseModule();
      getlist();
    } else {
      // message.error(res.message);
      console.log("Error obj :", res);
      setValidate(res.errors);
      setState((pre) => ({
        ...pre,
        loading: false,
      }));
    }
  };

  const onClickEdit = (item) => {
    // Check if dob is a valid date
    const formattedDob = item.date_of_birth ? moment(item.date_of_birth) : null; // Ensure dob is parsed correctly
    if (formattedDob && !formattedDob.isValid()) {
      console.error("Invalid date:", item.date_of_birth);
    }
    formrefe.setFieldsValue({
      ...item,
      date_of_birth: formattedDob,
    });
    setState((prevState) => ({
      ...prevState,
      VisibleModule: true,
    }));
  };

  const onClickDelete = (item) => {
    Modal.confirm({
      title: "Remove",
      content: "Are you sure you want to remove this item?",
      onOk: async () => {
        setState((pre) => ({
          ...pre,
          loading: true,
        })); // Set loading state to true
        try {
          const res = await request("customer/" + item.id, "delete");
          if (res && !res.error) {
            message.success("Delete Successfully!");
            getlist(); // Refresh the list
          } else {
            message.error(
              res?.error || "Failed to delete the item. Please try again."
            );
          }
        } catch (error) {
          message.error("An error occurred while deleting the item.");
          console.error(error); // Log for debugging
        } finally {
          setState((pre) => ({
            ...pre,
            loading: false,
          })); // Reset loading state
        }
      },
      onCancel: () => {
        message.info("Delete action was canceled.");
      },
    });
  };

  const handleFilter = () => {
    getlist();
  };

  // Filter roles based on the search term

  return (
    <MainPage loading={state.loading}>
      <div>
        <h1>{formrefe.getFieldValue("id")}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
          className=""
        >
          <Space>
            <div>Customer {state.list.length}</div>
            <Input.Search
              allowClear
              placeholder="Search"
              onSearch={getlist}
              onChange={(e) =>
                setFilter((prevState) => ({
                  ...prevState,
                  txt_search: e.target.value,
                }))
              }
            />
            <Select
              className="w-[200px]"
              allowClear
              placeholder="Select status"
              onChange={(value) =>
                setFilter((prevState) => ({
                  ...prevState,
                  status: value !== undefined ? value : null, // Set to null if undefined
                }))
              }
              options={[
                {
                  label: "Active",
                  value: 1,
                },
                {
                  label: "in Active",
                  value: 0,
                },
              ]}
            ></Select>
            <Button type="primary" onClick={handleFilter}>
              Filter
            </Button>
          </Space>
          <Button type="primary" icon={<MdAdd />} onClick={onClickAddbtn}>
            New
          </Button>
        </div>

        <Modal
          open={state.VisibleModule}
          title={
            formrefe.getFieldValue("id") ? "Edit customer" : "New customer"
          }
          footer={null}
          onCancel={oncloseModule}
        >
          <Form layout="vertical" onFinish={onFinish} form={formrefe}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="first_name"
                  label="First Name"
                  {...validate.first_name}
                >
                  <Input placeholder="First Name" allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="last_name"
                  label="Last Name"
                  {...validate.last_name}
                >
                  <Input placeholder="Last Name" allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="email" label="Email" {...validate.email}>
                  <Input placeholder="Email" allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="phone" label="Phone" {...validate.phone}>
                  <Input placeholder="Phone" allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="city" label="City" {...validate.city}>
                  <Input placeholder="City" allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="state" label="State" {...validate.state}>
                  <Input placeholder="State" allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="zip_code"
                  label="Zip Code"
                  {...validate.zip_code}
                >
                  <Input placeholder="Zip Code" allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="date_of_birth"
                  label="Date of Birth"
                  {...validate.date_of_birth}
                >
                  <DatePicker
                    placeholder="Select Date of Birth"
                    style={{ width: "100%" }}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="status" label="Status" {...validate.status}>
                  <Select
                    placeholder="Select Status"
                    options={[
                      {
                        label: "Active",
                        value: 1,
                      },
                      {
                        label: "Inactive",
                        value: 0,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="address" label="Address" {...validate.address}>
                  <Input.TextArea placeholder="Address" />
                </Form.Item>
              </Col>
            </Row>

            <Space>
              <Button onClick={oncloseModule}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                {formrefe.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </Space>
          </Form>
        </Modal>

        {/* {0 && (
        <div className="No-data">
          <CiCloudOn style={{ fontSize: 100 }} />
          <div>No record</div>
        </div>
      )} */}
        <Table
          dataSource={state.list}
          columns={[
            {
              title: "No",
              dataIndex: "No",
              key: "No",
              render: (item, data, index) => index + 1,
            },
            {
              title: "First Name",
              dataIndex: "first_name",
              key: "first_name",
            },
            {
              title: "Last Name",
              dataIndex: "last_name",
              key: "last_name",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Phone",
              dataIndex: "phone",
              key: "phone",
            },
            {
              title: "Address",
              dataIndex: "address",
              key: "address",
            },
            {
              title: "City",
              dataIndex: "city",
              key: "city",
            },
            {
              title: "State",
              dataIndex: "state",
              key: "state",
            },
            {
              title: "Zip Code",
              dataIndex: "zip_code",
              key: "zip_code",
            },
            {
              title: "Date of Birth",
              dataIndex: "date_of_birth",
              key: "date_of_birth",
              render: (value) => dateClient(value),
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (item) =>
                item == 1 ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="red">Inactive</Tag>
                ),
            },
            {
              title: "Created At",
              dataIndex: "created_at",
              key: "created_at",
              render: (value) => dateClient(value),
            },
            {
              title: "Action",
              key: "Action",
              align: "center",
              render: (item, data, index) => (
                <Space>
                  <Button
                    type="primary"
                    icon={<MdEdit />}
                    onClick={() => onClickEdit(data, index)}
                  />
                  <Button
                    type="primary"
                    danger
                    icon={<MdDelete />}
                    onClick={() => onClickDelete(data, index)}
                  />
                </Space>
              ),
            },
          ]}
        />
      </div>
    </MainPage>
  );
}

export default CustomerPage;
