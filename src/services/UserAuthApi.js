// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  endpoints: (builder) => ({
      registerUser : builder.mutation({
        query:(user)=>{
          return {
            url : 'register/',
            method : 'POST',
            body : user,
            headers: {
              'Content-type' : 'application/json',
            }
          }
        }
      })
  }),
})

export const { useRegisterUserMutation } = UserAuthApi