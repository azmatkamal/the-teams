import React from "react";

const VideosList = React.lazy(() => import("./views/videos/index"));
const UsersList = React.lazy(() => import("./views/users/index"));
const CountryList = React.lazy(() => import("./views/country/index"));
const CityList = React.lazy(() => import("./views/city/index"));
const DistrictList = React.lazy(() => import("./views/district/index"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/videos",
    exact: true,
    name: "Manage Videos",
    component: VideosList,
  },
  {
    path: "/users",
    exact: true,
    name: "Manage Users",
    component: UsersList,
  },
  {
    path: "/countires",
    exact: true,
    name: "Manage Countires",
    component: CountryList,
  },
  {
    path: "/cities",
    exact: true,
    name: "Manage Cities",
    component: CityList,
  },
  {
    path: "/districts",
    exact: true,
    name: "Manage District",
    component: DistrictList,
  },
];

export default routes;
