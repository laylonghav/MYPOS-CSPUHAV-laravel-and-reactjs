import React, { useEffect, useState } from "react";
import "./style.css";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
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
import { dateClient } from "../../util/helper";
import { useForm } from "antd/es/form/Form";
import { InfoCircleOutlined } from "@ant-design/icons";
import MainPage from "../../component/layout/MainPage";

function RolePage() {
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
    const res = await request("role" + queryparam, "get");
    // console.log(res);
    if (res && !res.errors) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        loading: false,
      }));
    }else  {
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
      id: formrefe?.getFieldValue("id"), // Ensure formrefe is defined and has id field
    };

    setState((pre) => ({
      ...pre,
      loading: true,
    }));
    let url = "role";
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
    // Set the current role for editing by populating newRole with the selected item
    formrefe.setFieldsValue({
      ...item,
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
          const res = await request("role/" + item.id, "delete");
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
            <div>Role {state.list.length}</div>
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
          title={formrefe.getFieldValue("id") ? "Edit role" : "New role"}
          footer={null}
          onCancel={oncloseModule}
        >
          <Form layout="vertical" onFinish={onFinish} form={formrefe}>
            <Form.Item
              name="name"
              label="Name"
              {...validate.name}
              // rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Name" allowClear />
            </Form.Item>
            {/* id name code description status address */}
            <Form.Item
              name="code"
              label="Code"
              {...validate.code}
              // rules={[{ required: true, message: "Code is required" }]}
            >
              <Input placeholder="Code" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item name={"status"} label="Status" {...validate.status}>
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
            <Form.Item name="address" label="Address">
              <Input.TextArea placeholder="Address" />
            </Form.Item>
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
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            // code
            // description
            // status
            // address
            {
              title: "Code",
              dataIndex: "code",
              key: "code",
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
            },
            {
              title: "Address",
              dataIndex: "address",
              key: "address",
            },
            {
              title: "Created at",
              dataIndex: "created_at",
              key: "created_at",
              render: (value) => dateClient(value),
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (item, data, index) =>
                item == 1 ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="red">Inactive</Tag>
                ),
            },
            {
              title: "Action",
              // dataIndex: "Action",
              align: "center",
              key: "Action",
              render: (item, data, index) => (
                <Space>
                  <Button
                    type="primary"
                    icon={<MdEdit />}
                    onClick={() => onClickEdit(data, index)}
                  ></Button>
                  <Button
                    type="primary"
                    danger
                    icon={<MdDelete />}
                    onClick={() => onClickDelete(data, index)}
                  ></Button>
                </Space>
              ),
            },
          ]}
        />
      </div>
    </MainPage>
  );
}

export default RolePage;
