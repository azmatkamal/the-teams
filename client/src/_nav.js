const nav = {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    {
      name: "Settings",
      url: "#",
      icon: "icon-settings",
      children: [
        {
          name: "Manage Countries",
          url: "/countires",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Cities",
          url: "/cities",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Districts",
          url: "/districts",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Nationalities",
          url: "/nationalities",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Stadiums",
          url: "/stadiums",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Fields",
          url: "/fields",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Games",
          url: "/games",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Requests",
          url: "/requests",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Playing Position",
          url: "/playing-position",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Videos",
          url: "/videos",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Main Ads",
          url: "/main-ads",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage User Roles",
          url: "/roles",
          icon: "icon-options-vertical",
        },
      ],
    },
    {
      name: "Manage Users",
      url: "/users",
      icon: "icon-people",
    },
    {
      name: "Manage Profiles",
      url: "/profiles",
      icon: "icon-people",
    },
  ],
};

export default nav;
