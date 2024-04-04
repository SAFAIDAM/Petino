import React from "react";
import {
  List,
  Filter,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  ImageField,
} from "react-admin";
const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="username" alwaysOn />
    {/* Add more filter inputs as needed */}
  </Filter>
);

const PostList = (props) => {
  return (
    <List {...props} filters={<PostFilter />} perPage={10}>
      <Datagrid>
        <TextField source="id" />
        <ImageField
          source="profilePicture"
          className="rounded-full"
          style={{ borderRadius: "50%" }}
        />
        <TextField source="fullName" />
        <TextField source="username" />
        <TextField source="email" />
        <TextField source="bio" />
        <TextField source="experience" />
        <TextField source="termsAndServices" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  );
};

export default PostList;
