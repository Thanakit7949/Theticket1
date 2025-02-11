import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import * as R from "ramda"
import LoginPage from "../views/Login";

import HomeUser from "../views/User/HomeUser";

import { routesConfig } from "./RounterConfig";
import { MainRouter } from "../interface/Router.interface";
import Home from "../views/Home"
import RegisterPage from "../views/Register";
import Profile from "../views/User/Profile";
import Dbconcerts from "../views/Admin/Dbconcerts";
import Dbsports from "../views/Admin/Dbsports";
import HomeAdmin from "../views/Admin/HomeAdmin";
import HomeTest from "../views/User/HomeTest";
import Interface from "../views/Admin/Interface";
import Users from "../views/Admin/Users";
import Orders from "../views/Admin/Orders";


const Router: React.FC = () => {
  const [publicRouteElements, setPublicRouteElements] = useState<any[]>([])
  const [privateRouteElements, setPrivateRouteElements] = useState<any[]>([])

  useEffect(() => {
      listRoute("publicRoute")
      listRoute("privateRoute")
  }, [])

  useEffect(() => {
      const path = window.location.pathname

      if (path === "/") {
          window.location.href = "/login"
          window.location.href = "/login"
      }
  }, [])

  const listRoute = async (routeType: "publicRoute" | "privateRoute") => {
      if (routeType === "publicRoute") {
          let temp = routesConfig[routeType].map(
              (item: any, index: number) => {
                  return (
                      <Route
                          key={index}
                          path={item.path}
                          element={item.component}
                      />
                  )
              }
          )

          setPublicRouteElements(temp)
      } else {
          let temp: MainRouter[] = []

          for await (const item of routesConfig[routeType]) {
              if (!R.isNil(item.component)) {
                  // let input: MainRouter = {
                  //     name: item.name,
                  //     path: item.path,
                  //     header: item.header,
                  //     component: item.component,
                  //     pathHeader: item.header,
                  //     // children:item.children.length > 0?item.children:[]
                  // }
                  let input = {
                      name: item.name,
                      path: item.path,
                      header: item.header,
                      component: item.component,
                      pathHeader: item.header,
                      subpath: item.subpath
                      // children:item.children.length > 0?item.children:[]
                  }
                  temp.push(input)
              }

              if (item.children && item.children.length > 0) {
                  for await (const itemchildren of item.children) {
                      let tempItem: any = itemchildren
                      let inputchildren = {
                          name: tempItem.name,
                          header: tempItem.header,
                          path: item.path + "/" + tempItem.path,
                          component: tempItem.component,
                          pathHeader: item.header + " / " + tempItem.header,
                          subpath: itemchildren.subpath
                          // children:itemchildren?.children?.length > 0?itemchildren?.children:[]
                      }
                      temp.push(inputchildren)

                      if (
                          itemchildren.children !== undefined &&
                          itemchildren.children?.length > 0
                      ) {
                          for await (const itemchildrenmini of itemchildren.children) {
                              let tempChildrenmini: any = itemchildrenmini
                              let inputchildrenmini = {
                                  // name: itemchildrenmini.name,
                                  // path: item.path + '/' + itemchildren.path + '/' + itemchildrenmini.path,
                                  // header: itemchildren.header + ' >> ' + itemchildrenmini.header,
                                  // component: itemchildrenmini.component,

                                  name: tempChildrenmini.name,
                                  header: tempChildrenmini.header,
                                  path:
                                      item.path +
                                      "/" +
                                      tempItem.path +
                                      "/" +
                                      tempChildrenmini.path,
                                  component: tempChildrenmini.component,
                                  pathHeader:
                                      item.header +
                                      " / " +
                                      tempChildrenmini.header,
                                  subpath: item.subpath
                              }
                              temp.push(inputchildrenmini)
                          }
                      }
                  }
              }
          }

          let _temp = temp.map((item: any, index: number) => {
              return (
                  <Route
                      key={index}
                      path={item.path}
                      element={
                          <Home routerHeader={item}>
                              <item.component />
                          </Home>
                      }
                  />
              )
          })

          setPrivateRouteElements(_temp)
      }
  }

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dbconcerts" element={<Dbconcerts />} />
        <Route path="/dbsports" element={<Dbsports />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/Interface" element={<Interface />} />
        <Route path="/Users" element={<Users />} />
        {/* <Route path="/Products" element={<Products />} /> */}
        <Route path="/Orders" element={<Orders />} />
        
        
        <Route path="/" element={
            <Home routerHeader={{
                path: "/home-user",
                name: "test",
                header: "tset",
                component: HomeUser,
                icon: null,
                children: [],
            }}>
                <HomeUser />
            </Home>
        } />

        {publicRouteElements}

        {privateRouteElements}
    </Routes>
</BrowserRouter>
//  <Route path="/concert-bus" element={<ConcertBus />} />
//  <Route path="/concert-got7" element={<ConcertGot7 />} />
//  <Route path="/concert-hypen" element={<ConcertHypen />} />
//  <Route path="/concert-pixxie" element={<ConcertPixxie />} />
//  <Route path="/concert-lykn" element={<ConcertLykn />} />
//  <Route path="/coupon-conditions" element={<CouponConditions />} />
//  <Route path="/concert-detail" element={<ConcertDetail />} />
//  <Route path="/sport-detail" element={<SportDetail />} />
  )
}

export default Router

