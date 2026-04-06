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
        url: `/google/calendar-list/${data.vendorId}/?view=month&year=2026&month=4`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCalendarLinkedQuery, useGetCalendarListQuery } =
  calendarApi;
