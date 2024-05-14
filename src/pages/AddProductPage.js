import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Select } from 'antd';
import { AppContext } from '../components/AppContext';

const { Option } = Select;

const AddProductPage = () => {
    const { products, addProduct, categories } = useContext(AppContext);
    const [cutomCategoryInput, setCutomCategoryInput] = useState(false)
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        const newProduct = { id: products.length + 1, ...values };
        addProduct({ ...newProduct, category: values.custom_category ? values.custom_category.charAt(0).toUpperCase() + values.custom_category.slice(1) : values.category })
        message.success('Product added successfully');
        navigate('/');
    };

    return (
        <div>
            <Link to="/">
                <Button type="primary" style={{ marginBottom: '16px' }}>Back to Product List</Button>
            </Link>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
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
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Product</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProductPage;
