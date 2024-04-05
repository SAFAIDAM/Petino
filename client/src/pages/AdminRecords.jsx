import React from 'react'
import AdminHeader from '../components/AdminHeader'
import ArrowPutton from '../components/ArrowPutton'
import { Link } from 'react-router-dom'

function AdminRecords() {
  return (
    <div className="">
      <AdminHeader />
      <div className="ml-auto mr-auto">
        <div className="flex items-center justify-between max-w-6xl p-3 mt-11">
          <div className="flex items-center justify-center ml-40 gap-11">
            <ArrowPutton />
          </div>
          <Link to='/admin/create'>
          <button>
            <h1 className="heading-signup">Add new Record</h1>
          </button></Link>
          
         
          <div>
            <h1 className="heading-signup">View Records</h1>
          </div>
          
        </div>

        <div className="overflow-x-auto shadow-md mr-11 ml-11 sm:rounded-lg mt-11">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400 md:min-w-full">
            <thead className="text-xs text-gray-700 uppercase bg-[#FAD0B7] bg:[#FAD0B7] dark:text-[#fac0b7]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  windows
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4 text-right">
                  <Link to="/admin/update">
                  <a
                    href="#"
                    className="font-medium text-[#e06c2e] hover:underline"
                  >
                    Edit
                  </a></Link>
               
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-[#e06c2e] hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
                <td className="px-6 py-4 text-right">
                <a
                    href="#"
                    className="font-medium text-[#e06c2e] hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminRecords