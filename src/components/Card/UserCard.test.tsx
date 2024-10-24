import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserCard, UserCardProps } from "./UserCard";

const user = {
  id: 1,
  name: "Leanne Graham",
  email: "Sincere@april.biz",
  phone: "1-770-736-8031 x56442",
  avatar:
    "https://avatars.dicebear.com/v2/avataaars/{{Leanne_Graham}}.svg?options[mood][]=happy",
  website: "http://hildegard.org",
  favorite: false,
};

const props: UserCardProps = {
  user,
  onEdit: jest.fn(),
  onRemove: jest.fn(),
  onFavorite: jest.fn(),
};

describe("userCard", () => {
  it("render the user info", () => {
    render(<UserCard {...props} />);
    const nameElement = screen.getByText(user.name);
    const phoneElement = screen.getByText(user.phone);
    const websiteElement = screen.getByText(user.website);
    const favoriteElement = screen.getByTestId("favorite-unchecked");
    const editElement = screen.getByTestId("edit-card-action");
    const removeElement = screen.getByTestId("remove-card-action");

    expect(nameElement).toBeInTheDocument();
    expect(phoneElement).toBeInTheDocument();
    expect(websiteElement).toBeInTheDocument();
    expect(favoriteElement).toBeInTheDocument();
    expect(editElement).toBeInTheDocument();
    expect(removeElement).toBeInTheDocument();
  });

  it("favorite, edit and remove actions should be called", () => {
    render(<UserCard {...props} />);

    const favoriteElement = screen.getByTestId("favorite-unchecked");
    fireEvent.click(favoriteElement);
    expect(props.onFavorite).toHaveBeenCalled();

    const editElement = screen.getByTestId("edit-card-action");
    fireEvent.click(editElement);
    expect(props.onEdit).toHaveBeenCalled();

    const removeElement = screen.getByTestId("remove-card-action");
    fireEvent.click(removeElement);
    expect(props.onRemove).toHaveBeenCalled();
  });
});
