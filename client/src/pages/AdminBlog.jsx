import React from 'react'
import AdminHeader from '../components/AdminHeader'
import ArrowPutton from '../components/ArrowPutton'

function AdminBlog() {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-center justify-between max-w-6xl p-3 mt-11">
          <div className="flex items-center justify-center gap-2 ml-40">
            <ArrowPutton />
          </div>
          <div>
            <h1 className="heading-signup">Blog Space</h1>
          </div>
        </div>
    <h1>blogposts</h1>

    </div>
  )
}

export default AdminBlog