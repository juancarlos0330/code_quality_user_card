import "./UserCard.css";

import React from "react";
import { FC } from "react";

import {
  EditOutlined,
  HeartFilled,
  DeleteFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Card } from "antd";

import { User } from "../../types";

export type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
  onRemove: (userId: number) => void;
  onFavorite: (userId: number, favorite: boolean) => void;
};

const { Meta } = Card;

export const UserCard: FC<UserCardProps> = ({
  user,
  onEdit,
  onRemove,
  onFavorite,
}) => {
  return (
    <>
      <Card
        cover={
          <img alt="user-avatar" className="bg-stone-200" src={user.avatar} />
        }
        actions={[
          user.favorite ? (
            <HeartFilled
              key="setting"
              style={{ color: "#eb2f96" }}
              onClick={() => onFavorite(user.id, !user.favorite)}
              data-testid="favorite-checked"
            />
          ) : (
            <HeartOutlined
              style={{ color: "#eb2f96" }}
              key="setting"
              onClick={() => onFavorite(user.id, !user.favorite)}
              data-testid="favorite-unchecked"
            />
          ),
          <EditOutlined
            key="edit"
            onClick={() => onEdit(user)}
            data-testid="edit-card-action"
          />,
          <DeleteFilled
            key="ellipsis"
            onClick={() => onRemove(user.id)}
            data-testid="remove-card-action"
          />,
        ]}
      >
        <Meta
          title={user.name}
          description={
            <>
              <div>
                <MailOutlined /> <span>{user.email}</span>
              </div>
              <div>
                <PhoneOutlined /> <span>{user.phone}</span>
              </div>
              <div>
                <GlobalOutlined /> <span>{user.website}</span>
              </div>
            </>
          }
        />
      </Card>
    </>
  );
};
