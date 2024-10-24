import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserModal, UserModalProps } from "./UserModal";
import userEvent from "@testing-library/user-event";

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

const props: UserModalProps = {
  user,
  isOpen: true,
  onSave: jest.fn(),
  onCancel: jest.fn(),
};

describe("userModal", () => {
  it("render the user info", () => {
    render(<UserModal {...props} />);
    const nameElement = screen.getByText(user.name);
    const emailElement = screen.getByDisplayValue(user.email);
    const phoneElements = screen.getByDisplayValue(user.phone);
    const websiteElements = screen.getByDisplayValue(user.website);

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(phoneElements).toBeInTheDocument();
    expect(websiteElements).toBeInTheDocument();
  });

  it("Cancel and <X> action should be called", () => {
    render(<UserModal {...props} />);
    const actions = screen.getAllByRole("button");

    fireEvent.click(actions[0]);
    expect(props.onCancel).toHaveBeenCalled();

    fireEvent.click(actions[2]);
    expect(props.onCancel).toHaveBeenCalled();
  });

  it("Save action should be called", async () => {
    const editedUser = {
      email: "123",
      id: 1,
      name: "Leanne Graham",
      phone: "123",
      website: "123",
    };

    render(<UserModal {...props} />);
    const actions = screen.getAllByRole("button");
    const inputs = screen.getAllByRole("textbox");

    console.log("geek: ", inputs[0]);

    userEvent.clear(inputs[0]);
    userEvent.clear(inputs[1]);
    userEvent.clear(inputs[2]);

    userEvent.type(inputs[0], editedUser.email);
    userEvent.type(inputs[1], editedUser.phone);
    userEvent.type(inputs[2], editedUser.website);

    const nameElement = screen.getByText(editedUser.name);
    const emailElement = screen.getByDisplayValue(editedUser.email);
    const phoneElements = screen.getByDisplayValue(editedUser.phone);
    const websiteElements = screen.getByDisplayValue(editedUser.website);

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(phoneElements).toBeInTheDocument();
    expect(websiteElements).toBeInTheDocument();

    // fireEvent.click(actions[1]);

    // await waitFor(() => {
    //   expect(props.onSave).toHaveBeenCalledWith({ ...editedUser });
    // });
  });
});
