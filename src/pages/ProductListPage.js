import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, message, Input, Select, Form } from 'antd';
import { AppContext } from '../components/AppContext';

const { Option } = Select;

const ProductListPage = () => {
  const { products, deleteProduct, categories, editProduct } = useContext(AppContext);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [cutomCategoryInput, setCutomCategoryInput] = useState(false)
  const [form] = Form.useForm();

  const handleDelete = () => {
    deleteProduct(selectedProduct.id)
    message.success('Product deleted successfully');
    setDeleteModalVisible(false);
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, product) => (
        <>
          <Button type="primary" onClick={() => { setProductToEdit(product); handleEdit(product) }}>Edit</Button>
          <Button danger onClick={() => { setSelectedProduct(product); setDeleteModalVisible(true); }}>Delete</Button>
        </>
      ),
    },
  ];

  const onFinish = (values) => {
    const newProduct = { ...values, category: values.custom_category ? values.custom_category.charAt(0).toUpperCase() + values.custom_category.slice(1) : values.category };
    editProduct(productToEdit.id, newProduct)
    message.success('Product updated successfully');
    setEditModalVisible(false)
  };

  const onFinishEdit = () => {
    form.submit()
  };

  const handleEdit = (product) => {
    form.setFields([
      {
        name: 'category',
        value: product.category,
      },
      {
        name: 'name',
        value: product.name,
      },
      {
        name: 'description',
        value: product.description,
      },
      {
        name: 'price',
        value: product.price,
      },
    ])
    setEditModalVisible(true)
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    const filtered = products.filter(product => product.category === value);
    setFilteredProducts(filtered);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSearchText('')
    setFilteredProducts(products);
  };

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])


  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/add-product">
          <Button type="primary">Add Product</Button>
        </Link>
        <Input.Search
          placeholder="Search products"
          style={{ width: 200, marginLeft: '16px' }}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select
          placeholder="Filter by category"
          style={{ width: 200, marginLeft: '16px' }}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories && categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
        <Button type='link' onClick={handleReset}>Reset</Button>
      </div>
      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="id"
      />
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>

      <Modal
        title="Edit Product"
        open={editModalVisible}
        onOk={onFinishEdit}
        onCancel={() => { setEditModalVisible(false) }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Please select a category!"
              onChange={(e) => {
                if (e === "custom") {
                  setCutomCategoryInput(true)
                } else {
                  setCutomCategoryInput(false)
                }
              }}
            >
              <Option value="custom">--Custom--</Option>
              {categories && categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>

          {cutomCategoryInput &&
            <Form.Item
              name="custom_category"
              label="Enter category name"
              rules={[{ required: cutomCategoryInput, message: 'Please input the category!' }]}
            >
              <Input />
            </Form.Item>
          }

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductListPage;
