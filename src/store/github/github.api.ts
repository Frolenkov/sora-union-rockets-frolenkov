import { IUser, ServerResponse } from "@/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubAPI = createApi({
    reducerPath: "github/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com"
    }),
    endpoints: build => ({
        searchUsers: build.query<IUser[], string>({
            query: (search: string) => ({
                url: `search/users`,
                params: {
                    q: search,
                    per_page: 10
                }
            }),
            transformResponse: (response: ServerResponse) => response.items.map(item=>({login: item.login}))
        })
    })
})

export const { useSearchUsersQuery} = githubAPI