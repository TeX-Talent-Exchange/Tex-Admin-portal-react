export const SidebarJson = {
  superadmin: [
    {
      title: "Admin",
      icon: "icon-ckeditor joyride-admin",
      key: "admin",
      menuItems: [
        {
          key: "roles",
          linkTo: "/admin/roles",
          icon: "icon-map-street-view",
          title: "Roles",
        },
        {
          key: "Avidtags",
          linkTo: "/admin/Avidtag",
          icon: "icon-map-street-view",
          title: "Avid Tags",
        },
        {
          key: "users",
          linkTo: "/admin/users",
          icon: "icon-map-drawing",
          title: "Users",
        },
      ],
    },
    {
      title: "Dashboard",
      icon: "icon-dasbhoard",
      key: "dashboard",
      menuItems: [
        {
          key: "customer360",
          linkTo: "/cip/customer360",
          icon: "icon-dasbhoard",
          title: "Customer 360",
        },
      ],
    }
  ],
};
