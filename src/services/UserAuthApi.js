// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
      registerUser : builder.mutation({
        query:(user)=>{
          return {
            url : 'api/user/register/',
            method : 'POST',
            body : user,
            headers: {
              'Content-type' : 'application/json',
            }
          }
        }
      }),
      loginUser : builder.mutation({
        query:(user)=>{
          return {
            url : 'api/user/login/',
            method : 'POST',
            body : user,
            headers: {
              'Content-type' : 'application/json',
            }
          }
        }
      }),
      profile : builder.query({
        query:(access_token)=>{
          return {
            url : 'api/user/profile/',
            method : 'GET',
            headers: {
              'authorization' : `Bearer ${access_token}`,
            }
          }
        }
      }),
      // postBlog : builder.mutation({
      //   query:({data, access_token})=>{
      //     console.log(data.get('title'))
      //   console.log(data.get('info'))
      //   console.log(data.get('image'))
      //     return {
      //       url : '/',
      //       method : 'POST',
      //       body : data,
      //       headers: {
      //         'Content-type' : `multipart/form-data; boundary=${data._boundary}`,
      //         'authorization' : `Bearer ${access_token}`,
      //       }
      //     }
      //   }
      // }),
  }),
})

export const { useRegisterUserMutation, useLoginUserMutation, useProfileQuery} = UserAuthApi