import { MainRouter } from "../interface/Router.interface";
import HomeTest from "../views/User/HomeTest";
import Dbconcerts from "../views/Admin/Dbconcerts";
import Dbsports from "../views/Admin/Dbsports";

import Users from "../views/Admin/Users";
import Orders from "../views/Admin/Orders";

export const routesConfigD: {
  publicRoute: MainRouter[];
  privateRoute: MainRouter[];
} = {
  publicRoute: [
    {
      path: "*",
      // component: <NotFoundPage />,
      component: "",
    },
  ],
  privateRoute: [
    {
      path: "/home-test",
      name: "home",
      header: "home",
      component: HomeTest,
      icon: null,
      children:  [],
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
      path: "/Product",
      name: "Product",
      header: "",
      component: "",
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
