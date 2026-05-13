import { api } from "../../app/api";

export const calendarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarLinked: builder.query({
      query: (userId) => ({
        url: `/google/linked?userId=${userId}`,
        method: "GET",
      }),
    }),
    getCalendarList: builder.query({
      query: (data) => ({
        url: `/google/calendar-list/${data.vendorId}/?view=${data?.view}&year=${data?.year}&month=${data?.month}`,
        method: "GET",
      }),
    }),
    getClientCalendarList: builder.query({
      query: (data) => ({
        url: `/google/client/calendar-list?view=${data?.view}&year=${data?.year}&month=${data?.month}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCalendarLinkedQuery, useGetCalendarListQuery, useGetClientCalendarListQuery } =
  calendarApi;
