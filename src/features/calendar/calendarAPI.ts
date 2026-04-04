import { api } from "../../app/api";

export const calendarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarLinked: builder.query({
      query: (userId) => ({
        url: `/google/linked?userId=${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCalendarLinkedQuery } = calendarApi;