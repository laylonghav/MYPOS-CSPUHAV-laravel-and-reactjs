import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
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
  Upload,
} from "antd";
import { MdAdd, MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { request } from "../../util/request";
import { dateClient, dateServer } from "../../util/helper";
import { PlusOutlined } from "@ant-design/icons";
import MainPage from "../../component/layout/MainPage";
import config from "../../util/config";
import ProductCard from "../../component/product/ProductCard";
import { productStore } from "../../store/productStore";
import { countStore } from "../../store/countStore";

function PosPage() {
  const [validate, setValidate] = useState({});
  const [formrefe] = Form.useForm();
  useEffect(() => {
    getlist();
  }, []);
  const [state, setState] = useState({
    VisibleModule: false,
    loading: false,
    list: [],
  });

  const [filter, setFilter] = useState({
    txt_search: null,
    status: null,
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

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



  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getlist = async () => {
    setState((pre) => ({
      ...pre,
      loading: true,
    }));
    let queryparam = "?";
    if (filter.txt_search !== null && filter.txt_search !== "") {
      queryparam += "&txt_search=" + filter.txt_search;
    }
    if (filter.status !== null && filter.status !== "") {
      queryparam += "&status=" + filter.status;
    }
    const res = await request("product" + queryparam, "get");
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
    setFileList([]);
    formrefe.resetFields();
    setState((prevState) => ({
      ...prevState,
      VisibleModule: false,
    }));
    setValidate({});
  };

  const onFinish = async (item) => {
    setState((pre) => ({
      ...pre,
      loading: true,
    }));

    // `name`, `code`, `from_country`, `image`, `status`, `created_at`,
    let formData = new FormData();
    // Check for valid values before appending to FormData
    if (item.name && item.name !== "undefined") {
      formData.append("name", item.name);
    }

    if (item.code && item.code !== "undefined") {
      formData.append("code", item.code);
    }

    if (item.from_country && item.from_country !== "undefined") {
      formData.append("from_country", item.from_country);
    }
    // formData.append("name", item.name);
    // formData.append("code", item.code);
    // formData.append("from_country", item.from_country);
    formData.append("status", item.status);
    if (item.image && item.image.file) {
      if (item.image && item.image.file.originFileObj) {
        formData.append("image", item.image.file.originFileObj);
      } else if (item.image.file?.status === "removed") {
        formData.append("image_remove", item.image.file?.name);
      }
    }

    let url = "brands";
    let method = "post";
    if (formrefe.getFieldValue("id") !== undefined) {
      url += "/" + formrefe.getFieldValue("id");
      method = "post"; // method = "put";
      formData.append("_method", "PUT");
    }

    const res = await request(url, method, formData);
    console.log("check res in page:", res);
    if (res && !res.errors) {
      message.success(res.message);
      oncloseModule();
      getlist();
      setState((pre) => ({
        ...pre,
        loading: false,
      }));
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
    if (item.image) {
      setFileList([
        {
          uid: item.id,
          name: item.image,
          status: "done",
          url: config.image_path + item.image,
        },
      ]);
    } else {
      setFileList([]); // Clear the file list if the image is null
      formrefe.setFieldsValue({ image: null }); // Reset the image field
    }
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
          const res = await request("brands/" + item.id, "delete");
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

  return (
    <MainPage loading={state.loading}>
      <div>
        {/* <h1>{formrefe.getFieldValue("id")}</h1> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
          className=""
        >
          <Space>
            <div>Product {state.list.length}</div>
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
                  label: "Inactive",
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
          title={formrefe.getFieldValue("id") ? "Edit brands" : "New brands"}
          footer={null}
          onCancel={oncloseModule}
        >
          <Form layout="vertical" onFinish={onFinish} form={formrefe}>
            {/* name`, `code`, `from_country`, `image`, `status`, `created_at`, */}

            <Form.Item label="Name" name="name" {...validate.name}>
              <Input placeholder="Name" allowClear />
            </Form.Item>

            <Form.Item label="Code" name="code" {...validate.code}>
              <Input allowClear placeholder="Code" />
            </Form.Item>

            <Form.Item
              name="from_country"
              label="From country"
              {...validate.from_country}
            >
              <Input placeholder="From country" allowClear />
            </Form.Item>

            <Form.Item label="Status" name="status" {...validate.status}>
              <Select
                allowClear
                placeholder="Select Status"
                options={[
                  {
                    label: "Active",
                    value: "active",
                  },
                  {
                    label: "Inactive",
                    value: "inactive",
                  },
                ]}
              />
            </Form.Item>

            {/* Profile Image */}
            <Form.Item label="Picture brand" name="image" {...validate.image}>
              <Upload
                customRequest={(e) => {
                  e.onSuccess();
                }}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
              }}
              src={previewImage}
              style={{ display: "none" }}
            />

            <Space>
              <Button onClick={oncloseModule}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                {formrefe.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </Space>
          </Form>
        </Modal>
        <Row
          gutter={[
            { xs: 2, sm: 4, md: 6, lg: 12, xl: 16 },
            { xs: 2, sm: 4, md: 6, lg: 12, xl: 16 },
          ]}
        >
          {state.list?.map((item, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
              <ProductCard
                {...item}
                brands={item.brands?.name}
                categories={item.categories?.name}
                onaddtobag={() => onaddtobag(item)}
                // onwishlist={() => onwishlist(item)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </MainPage>
  );
}

export default PosPage;
