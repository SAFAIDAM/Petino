// customDataProvider.js
import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:8000/api/user/"; // Update with your backend API URL

const customDataProvider = {
  getList: async (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
          ...fetchUtils.flattenObject(params.filter),
          _sort: field,
          _order: order,
          _start: (page - 1) * perPage,
          _end: page * perPage,
      };
      const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;

      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const totalCount = parseInt(response.headers.get('X-Total-Count'));

          // Add an 'id' field to each data item
          const dataWithIds = data.map((item, index) => ({
              ...item,
              id: index + 1, // You can use a different unique identifier here
          }));

          return {
              data: dataWithIds,
              total: totalCount,
          };
      } catch (error) {
          console.error('Error:', error);
          throw new Error('Error fetching data');
      }
  },
  // Implement other CRUD methods as needed
};


export default customDataProvider;
