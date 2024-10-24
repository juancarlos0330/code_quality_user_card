import "./UserModal.css";

import React from "react";
import { FC, useEffect } from "react";
import { Modal, Form, Input, Button, Row, Col } from "antd";
import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";

import { User } from "../../types";

export type UserModalProps = {
  user: User | null;
  isOpen: boolean;
  onSave: (user: User) => void;
  onCancel: () => void;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

export const UserModal: FC<UserModalProps> = ({
  user,
  isOpen,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      id: user?.id,
      name: user?.name,
      avatar: user?.avatar,
      email: user?.email,
      phone: user?.phone,
      website: user?.website,
    });
  }, [user, form]);

  return (
    <>
      <Modal
        title={`${user ? "Edit User" : "Create User"}`}
        open={isOpen}
        onCancel={onCancel}
        footer={[<div key="nothing"></div>]}
      >
        <Form
          {...layout}
          form={form}
          name="edit-modal"
          onFinish={onSave}
          data-testid="edit-user"
        >
          <Form.Item name="id" className="hidden">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="name" wrapperCol={{ span: 24 }}>
            <h1>{user?.name}</h1>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email" },
              { type: "email", message: "Wrong email format" },
            ]}
          >
            <Input size="large" placeholder="Email" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input phone" }]}
          >
            <Input
              size="large"
              placeholder="Phone"
              prefix={<PhoneOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[{ required: true, message: "Please input website" }]}
          >
            <Input
              size="large"
              placeholder="Website"
              prefix={<GlobalOutlined />}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Row justify="center" gutter={16}>
              <Col>
                <Button type="primary" htmlType="submit">
                  Edit
                </Button>
              </Col>
              <Col>
                <Button htmlType="button" onClick={onCancel}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
