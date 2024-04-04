import React from 'react'
import { Create, SimpleForm, TextInput, DateInput } from 'react-admin'

const CreatePost = (props) => {
  return (

    <Create title='create a post ' {...props}>
      <SimpleForm>
        <TextInput source='id' />
        <TextInput source='fullName' />
      </SimpleForm>
    </Create>
  )
}

export default CreatePost 