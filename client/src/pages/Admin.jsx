import React from "react";
import { Admin, Resource, Layout, MenuItemLink } from "react-admin";
import PostList from "../components/PostList";
import DataProvider from "./DataProvider";
import CreatePost from "../components/CreateUser";
import PeopleIcon from '@mui/icons-material/People'

// Custom Menu Component
const CustomMenu = () => (
  <div>
    <MenuItemLink to="/profile" primaryText="profile" leftIcon={<PeopleIcon />}/>
    <MenuItemLink to="/admin/users" primaryText="users" leftIcon={<PeopleIcon />}/>
    {/* Add more MenuItemLink components as needed */}
  </div>
);

function AdminId() {
  return (
    <Admin dataProvider={DataProvider} layout={Layout} menu={CustomMenu}>
      <Resource name="users" list={PostList} />
      <Resource name="admin/users" list={PostList} />
    </Admin>
  );
}

export default AdminId;
