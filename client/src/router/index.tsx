import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import * as R from "ramda"
import Dashboard from "../views/dashboard/DashBoard"
import LoginPage from "../views/Login";
import HomeAdmin from "../views/Admin/HomeAdmin";
import HomeUser from "../views/User/HomeUser";
import Concert from "../views/User/Concert";
import Sport from "../views/User/Sport";
import Promotion from "../views/User/Promotion";
import Product from "../views/User/Product";
import Information from "../views/User/Information";
import Page1Page from "../views/User/Page1";
import { routesConfig } from "./RounterConfig";
import { MainRouter } from "../interface/Router.interface";
import Home from "../views/Home"
import PrivateRoute from "./PrivateRoute"
// suay
import CouponConditions from "../views/User/CouponConditions";
import ConcertBus from "../views/User/detailconcert/ConcertBus";
import ConcertGot7 from "../views/User/detailconcert/ConcertGot7";
import ConcertHypen from "../views/User/detailconcert/ConcertHypen";
import ConcertPixxie from  "../views/User/detailconcert/ConcertPixxie";
import ConcertLykn from  "../views/User/detailconcert/ConcertLykn";
import ConcertDetail from "../views/User/ConcertDetail";
import SportDetail from "../views/User/SportDetail";

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
          window.location.href = "/home-user"
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

