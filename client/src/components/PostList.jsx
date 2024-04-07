import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  Pagination
} from "react-admin";
const PostList = (props) => {
  
  return <List {...props} pagination={<Pagination />}>
<Datagrid>
  <TextField source='id' />
  <TextField source='fullName' />
  <TextField source='username' />
  <TextField source='email' />
  <DateField source='createdAt' />
  <DateField source='updatedAt' />
  <EditButton basepath='/users' />
  <DeleteButton basepath='/users' />
</Datagrid>
  </List>

}

export default PostList;
