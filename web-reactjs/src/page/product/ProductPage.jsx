import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
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
import { dateClient, dateServer, isPermission } from "../../util/helper";
import { PlusOutlined } from "@ant-design/icons";
import MainPage from "../../component/layout/MainPage";
import config from "../../util/config";

function BrandPage() {
  const [validate, setValidate] = useState({});
  const [formrefe] = Form.useForm();
  useEffect(() => {
    getlist();
  }, []);
  const [state, setState] = useState({
    VisibleModule: false,
    loading: false,
    list: [],
    brands: [],
    categories: [],
  });

  const [filter, setFilter] = useState({
    txt_search: null,
    status: "",
    brand_id: null,
    category_id: null,
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getlist = async (param_filter = {}) => {
    param_filter = {
      ...filter,
      ...param_filter,
    };
    setState((pre) => ({
      ...pre,
      loading: true,
    }));
    let queryparam = "?";
    if (param_filter.txt_search !== null && param_filter.txt_search !== "") {
      queryparam += "&txt_search=" + param_filter.txt_search;
    }
    if (param_filter.status !== null && param_filter.status !== "") {
      queryparam += "&status=" + param_filter.status;
    }
    if (param_filter.brand_id !== null && param_filter.brand_id !== "") {
      queryparam += "&brand_id=" + param_filter.brand_id;
    }
    if (param_filter.category_id !== null && param_filter.category_id !== "") {
      queryparam += "&category_id=" + param_filter.category_id;
    }
    const res = await request("product" + queryparam, "get");
    // console.log(res);
    if (res && !res.errors) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        brands: res.brands,
        categories: res.categories,
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

    // Create a new FormData instance
    let formData = new FormData();

    // Check if values are valid before appending to FormData
    if (item.product_name && item.product_name !== "undefined") {
      formData.append("product_name", item.product_name); // renamed from 'name' to 'product_name'
    }

    // Handling category and brand
    if (item.category_id) {
      formData.append("category_id", item.category_id);
    }

    if (item.brand_id) {
      formData.append("brand_id", item.brand_id);
    }

    if (item.quantity && item.quantity !== "undefined") {
      formData.append("quantity", item.quantity);
    }

    if (item.price && item.price !== "undefined") {
      formData.append("price", item.price);
    }

    if (item.discount && item.discount !== "undefined") {
      formData.append("discount", item.discount);
    }

    formData.append("status", item.status);

    if (item.description && item.description !== "undefined") {
      formData.append("description", item.description);
    }

    // Handle image field (upload or remove)
    if (item.image && item.image.file) {
      if (item.image.file.originFileObj) {
        formData.append("image", item.image.file.originFileObj);
      } else if (item.image.file?.status === "removed") {
        formData.append("image_remove", item.image.file?.name);
      }
    }

    // Determine URL and HTTP method
    let url = "product";
    let method = "post";
    if (formrefe.getFieldValue("id") !== undefined) {
      url += "/" + formrefe.getFieldValue("id");
      // method = "put"; // Update method for existing product
      formData.append("_method", "PUT");
    }

    try {
      const res = await request(url, method, formData);
      console.log("Response:", res);
      if (res && !res.errors) {
        message.success(res.message);
        oncloseModule();
        getlist(); // Refresh the product list
      } else {
        console.log("Error response:", res);
        setValidate(res.errors);
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
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
          const res = await request("product/" + item.id, "delete");
          if (res && !res.errors) {
            // Handle successful deletion
            message.success("Delete Successfully!");
            getlist(); // Refresh the list
          } else {
            message.error(
              res?.errors || "Failed to delete the item. Please try again."
            );
          }
        } catch (errors) {
          message.error("An error occurred while deleting the item.");
          console.error(errors); // Log for debugging
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
  const handleReset = () => {
    const data = {
      txt_search: null,
      status: null,
      brand_id: null,
      category_id: null,
    };
    setFilter(data);
    getlist(data);
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
            <div>product {state.list.length}</div>
            <Input.Search
              value={filter.txt_search}
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
              value={filter.status}
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
            <Select
              value={filter.category_id}
              className="w-[200px]"
              allowClear
              placeholder="Select category"
              onChange={(value) =>
                setFilter((prevState) => ({
                  ...prevState,
                  category_id: value !== undefined ? value : null, // Set to null if undefined
                }))
              }
              options={state.categories?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            ></Select>
            <Select
              value={filter.brand_id}
              className="w-[200px]"
              allowClear
              placeholder="Select brands"
              onChange={(value) =>
                setFilter((prevState) => ({
                  ...prevState,
                  brand_id: value !== undefined ? value : null, // Set to null if undefined
                }))
              }
              options={state.brands?.map((item, index) => ({
                label: item.name,
                value: item.id,
              }))}
            ></Select>
            <Button type="primary" onClick={handleReset}>
              Reset
            </Button>
            <Button type="primary" onClick={handleFilter}>
              Filter
            </Button>
          </Space>
          {isPermission("Product.Create") && (
            <Button type="primary" icon={<MdAdd />} onClick={onClickAddbtn}>
              New
            </Button>
          )}
        </div>
        <Modal
          open={state.VisibleModule}
          title={formrefe.getFieldValue("id") ? "Edit Product" : "New Product"}
          footer={null}
          onCancel={oncloseModule}
        >
          <Form layout="vertical" onFinish={onFinish} form={formrefe}>
            <Row gutter={16}>
              {/* Product Name */}
              <Col span={12}>
                <Form.Item
                  label="Product Name"
                  name="product_name"
                  {...validate.product_name}
                >
                  <Input placeholder="Product Name" allowClear />
                </Form.Item>
              </Col>

              {/* Category */}
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="category_id"
                  {...validate.category_id}
                >
                  <Select
                    allowClear
                    placeholder="Select Category"
                    options={state.brands?.map((item, index) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                  />
                </Form.Item>
              </Col>

              {/* Brand */}
              <Col span={12}>
                <Form.Item label="Brand" name="brand_id" {...validate.brand_id}>
                  <Select
                    allowClear
                    placeholder="Select Brand"
                    options={state.categories?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                  />
                </Form.Item>
              </Col>

              {/* Quantity */}
              <Col span={12}>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  {...validate.quantity}
                >
                  <InputNumber
                    className="w-full"
                    placeholder="Quantity"
                    allowClear
                    min={0}
                  />
                </Form.Item>
              </Col>

              {/* Price */}
              <Col span={12}>
                <Form.Item label="Price" name="price" {...validate.price}>
                  <InputNumber
                    className="w-full"
                    placeholder="Price"
                    allowClear
                    min={0}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>

              {/* Discount */}
              <Col span={12}>
                <Form.Item
                  label="Discount"
                  name="discount"
                  {...validate.discount}
                >
                  <InputNumber
                    className="w-full"
                    placeholder="Discount"
                    allowClear
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
              </Col>

              {/* Status */}
              <Col span={24}>
                <Form.Item label="Status" name="status" {...validate.status}>
                  <Select
                    allowClear
                    placeholder="Select Status"
                    options={[
                      { label: "Active", value: 1 },
                      { label: "Inactive", value: 0 },
                    ]}
                  />
                </Form.Item>
              </Col>

              {/* Description */}
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  {...validate.description}
                >
                  <Input.TextArea placeholder="Description" allowClear />
                </Form.Item>
              </Col>

              {/* Product Image */}
              <Col span={24}>
                <Form.Item
                  label="Product Image"
                  name="image"
                  {...validate.image}
                >
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
              </Col>
            </Row>

            {/* Image Preview */}
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
              }}
              src={previewImage}
              style={{ display: "none" }}
            />

            {/* Form Actions */}
            <Space>
              <Button onClick={oncloseModule}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                {formrefe.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </Space>
          </Form>
        </Modal>
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
              title: "Categories",
              dataIndex: "categories",
              render: (categories) => categories?.name,
            },
            {
              title: "Brand",
              dataIndex: "brands",
              key: "brands",
              render: (brands) => brands?.name,
            },
            {
              title: "Name",
              dataIndex: "product_name",
              key: "product_name",
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              render: (value) =>
                parseFloat(value).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                }),
            },
            {
              title: "Discount",
              dataIndex: "discount",
              key: "discount",
              render: (value) =>
                (value / 100).toLocaleString("en-US", {
                  style: "percent",
                  minimumFractionDigits: 2, // Ensures two decimal places
                  maximumFractionDigits: 2, // Ensures two decimal places
                }),
            },

            {
              title: "Image",
              dataIndex: "image",
              key: "image",
              render: (value) =>
                value ? (
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{
                      width: "150px",
                      height: "100px",
                      aspectRatio: "1/1",
                    }} // Standardized size with aspect ratio
                  >
                    <Image
                      className="w-full h-full object-cover" // Ensures the image fits the container
                      src={config.image_path + value}
                      alt="Product Image"
                    />
                  </div>
                ) : (
                  ""
                ),
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
              render: (value) => dateClient(value, "YYYY-MM-DD"),
            },
            {
              title: "Action",
              key: "Action",
              align: "center",
              hidden:
                isPermission("Product.Update") || isPermission("Product.Remove")
                  ? false
                  : true,
              render: (item, data, index) => (
                <Space>
                  {isPermission("Product.Update") && (
                    <Button
                      type="primary"
                      icon={<MdEdit />}
                      onClick={() => onClickEdit(data, index)}
                    />
                  )}
                  {isPermission("Product.Remove") && (
                    <Button
                      type="primary"
                      danger
                      icon={<MdDelete />}
                      onClick={() => onClickDelete(data, index)}
                    />
                  )}
                </Space>
              ),
            },
          ]}
        />
      </div>
    </MainPage>
  );
}

export default BrandPage;
