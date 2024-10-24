import "./UserList.css";

import React from "react";
import { FC, useState, useEffect } from "react";
import { Row, Col, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { UserCard } from "../../components/Card";
import { UserModal } from "../../components/UserModal";

import { getUser } from "../../services/user.api";

import { User } from "../../types";

export const UserList: FC = () => {
  const [users, setUsers] = useState<User[] | undefined>();
  const [editUser, setEditUser] = useState<User | null>(null);

  const [modal, contextHolder] = Modal.useModal();

  const fetchUsers = async () => {
    const userList = await getUser();
    userList?.forEach((user: User) => {
      user.avatar = `https://avatars.dicebear.com/v2/avataaars/{{${user.name}}}.svg?options[mood][]=happy`;
      user.website = `http://${user.website}`;
    });
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Actions for UserCard
  const setUserModal = (user: User) => {
    setEditUser(user);
  };

  const setRemoveModal = (userId: number) => {
    modal.confirm({
      title: "Delete User",
      icon: <ExclamationCircleOutlined />,
      content: "Do you really want to delete this user?",
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => confirmDelete(userId),
    });
  };

  const setFavorite = (userId: number, favorite: boolean) => {
    const filteredUsers = users?.map((item) => {
      if (item.id === userId) return { ...item, favorite: favorite };
      return item;
    });

    setUsers(filteredUsers);
  };

  // Actions for UserModal
  const handleEditUserModal = (user: User) => {
    const updatedUsers = users?.map((item) => {
      if (item.id === user.id) return user;
      return item;
    });

    setUsers(updatedUsers);
    setEditUser(null);
  };

  const handleCancelUserModal = () => {
    setEditUser(null);
  };

  // Actions for Delete confirm Modal
  const confirmDelete = (userId: number) => {
    const filteredUsers = users?.filter((item) => {
      return item.id !== userId;
    });

    setUsers(filteredUsers);
  };

  return (
    <div className="userlist-container">
      <UserModal
        isOpen={!!editUser}
        user={editUser}
        onSave={handleEditUserModal}
        onCancel={handleCancelUserModal}
        data-testid="user-modal"
      />
      {contextHolder}
      <Row gutter={[16, 16]} justify="center">
        {users?.map((item) => (
          <Col
            xs={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}
            data-testid="user-card"
            key={item.id}
          >
            <UserCard
              user={item}
              onEdit={setUserModal}
              onRemove={setRemoveModal}
              onFavorite={setFavorite}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
