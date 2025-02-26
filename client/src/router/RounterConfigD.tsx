import { MainRouter } from "../interface/Router.interface";
import HomeTest from "../views/User/HomeTest";
import Dbconcerts from "../views/Admin/Dbconcerts";
import Dbsports from "../views/Admin/Dbsports";
import Users from "../views/Admin/Users";
import Orders from "../views/Admin/Orders";
import Interface from "../views/Admin/Interface";
import Products from "../views/Admin/products";

export const routesConfigD: {
  publicRouteD: MainRouter[];
  privateRouteD: MainRouter[];
} = {
  publicRouteD: [
    {
      path: "*",
      // component: <NotFoundPage />,
      component: "",
    },
  ],
  privateRouteD: [
    {
      path: "/home-admin",
      name: "home-Interface",
      header: "home-Interface",
      component: Interface,
      icon: null,
      children: [
        {
          path: "/users",
          name: "users",
          header: "users",
          component: Users,
          icon: null,
          children: [],   
        },
       
      ],
    },
    {
      path: "/users",
      name: "users",
      header: "users",
      component: Users,
      icon: null,
      children: [],   
    },
    {
      path: "/dbconcerts",
      name: "Concert",
      header: "dbconcerts",
      component: Dbconcerts,
      icon: null,
      children: [],
    },
    {
      path: "/dbsports",
      name: "Sport",
      header: "dbsports",
      component: Dbsports,
      icon: null,
      children: [],   
    },
    {
      path: "/Products",
      name: "Products",
      header: "Products",
      component: Products,
      icon: null,
      children: [],   
    },
    {
      path: "/Orders",
      name: "Order",
      header: "Order",
      component: Orders,
      icon: null,
      children: [],   
    },
   
       

   
  
   

  


    
  ],

  
};
