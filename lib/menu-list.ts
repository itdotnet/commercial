import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    Wrench,
    Warehouse
  } from "lucide-react";

  type Submenu = {
    href: string;
    label: string;
    active: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon
    submenus: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    menus: Menu[];
  };

export function getMenuList(pathname: string): Group[] {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard",
            label: "Dashboard",
            active: pathname==="/dashboard",
            icon: LayoutGrid,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "Contents",
        menus: [
          {
            href: "",
            label: "Posts",
            active: pathname.includes("/blog"),
            icon: SquarePen,
            submenus: [
              {
                href: "/dashboard/blog/list",
                label: "All Posts",
                active: pathname === "/dashboard/blog/list"
              },
              {
                href: "/dashboard/blog/new",
                label: "New Post",
                active: pathname === "/dashboard/blog/new"
              }
            ]
          },
          {
            href: "",
            label: "Services",
            active: pathname.includes("/service"),
            icon: Wrench,
            submenus: [
              {
                href: "/dashboard/service/list",
                label: "All Services",
                active: pathname === "/dashboard/service/list"
              },
              {
                href: "/dashboard/service/new",
                label: "New Service",
                active: pathname === "/dashboard/service/new"
              }
            ]
          },
          {
            href: "",
            label: "Products",
            active: pathname.includes("/Product"),
            icon: Warehouse,
            submenus: [
              {
                href: "/dashboard/product/list",
                label: "All Products",
                active: pathname === "/dashboard/product/list"
              },
              {
                href: "/dashboard/product/new",
                label: "New Product",
                active: pathname === "/dashboard/product/new"
              }
            ]
          },
          {
            href: "",
            label: "Orders",
            active: pathname.includes("/Order"),
            icon: Warehouse,
            submenus: [
              {
                href: "/dashboard/order/list",
                label: "All Orders",
                active: pathname === "/dashboard/order/list"
              },
              {
                href: "/dashboard/order/new",
                label: "New Order",
                active: pathname === "/dashboard/order/new"
              }
            ]
          },
          {
            href: "/categories",
            label: "Categories",
            active: pathname.includes("/categories"),
            icon: Bookmark,
            submenus: []
          },
          {
            href: "/tags",
            label: "Tags",
            active: pathname.includes("/tags"),
            icon: Tag,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/users",
            label: "Users",
            active: pathname.includes("/users"),
            icon: Users,
            submenus: []
          },
          {
            href: "/account",
            label: "Account",
            active: pathname.includes("/account"),
            icon: Settings,
            submenus: []
          }
        ]
      }
    ];
  }
  