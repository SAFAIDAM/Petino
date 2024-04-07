import React from "react";
import { Admin, Resource } from "react-admin";
import PostList from "../components/PostList";
import DataProvider from "./DataProvider";

function AdminId() {
  return (
    <Admin dataProvider={DataProvider}>
      <Resource name="users" list={PostList} />
    </Admin>
  );
}

export default AdminId;
