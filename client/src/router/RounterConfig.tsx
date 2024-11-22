import { MainRouter } from "../interface/Router.interface";
//import Dashboard from "../views/dashboard/DashBoard"
import Concert from "../views/User/Concert";
import ConcertDetail from "../views/User/ConcertDetail";
import ConcertBus from "../views/User/detailconcert/ConcertBus";
import ConcertGot7 from "../views/User/detailconcert/ConcertGot7";
import ConcertHypen from "../views/User/detailconcert/ConcertHypen";
import ConcertLykn from "../views/User/detailconcert/ConcertLykn";
import ConcertPixxie from "../views/User/detailconcert/ConcertPixxie";
import HomeTest from "../views/User/HomeTest";
//import HomeUser from "../views/User/HomeUser"
import Information from "../views/User/Information";
import Page1Page from "../views/User/Page1";
import Sport from "../views/User/Sport";
import Promotion from "../views/User/Promotion";
import SportDetail from "../views/User/SportDetail";
import Product from "../views/User/Product";
import ProductDetail from "../views/User/ProductDetail";
import PaymentPage from "../views/User/PaymentPage";
import StageConcert from "../views/User/StageConcert";
import StageSport from "../views/User/StageSport";
import SeatConcert from "../views/User/SeatConcert";
import SeatSport from "../views/User/SeatSport";
import PaymentConcert from "../views/User/PaymentConcert";
import PaymentSport from "../views/User/PaymentSport";
import TicketConcert from "../views/User/TicketConcert";
import TicketSport from "../views/User/TicketSport";
//import Dashboard from "../views/User/Dashboard"

export const routesConfig: {
  publicRoute: MainRouter[];
  privateRoute: MainRouter[];
} = {
  publicRoute: [
    {
      path: "*",
      // component: <NotFoundPage />,
      component: "",
    },
    // {
    //     path: "/login",
    //     // name: "Categories",
    //     // header: "Categories",
    //     component: LoginPage,
    //     icon: <Home />,
    //     children: [],
    // },
  ],
  privateRoute: [
    // {
    //     path: "/dashboard",
    //     name: "dashboard",
    //     header: "dashboard",
    //     component: Dashboard,
    //     icon: null,
    //     children: [],
    // },
    {
      path: "/home-test",
      name: "home",
      header: "home",
      component: HomeTest,
      icon: null,
      children: [],
    },
    {
      path: "/concert",
      name: "concert",
      header: "concert",
      component: Concert,
      icon: null,
      children: [
        {
          path: "bus",
          name: "bus",
          header: "bus",
          component: ConcertBus,
          icon: null,
          subpath: false,
          children: [],
        },
        {
          path: "got7",
          name: "got7",
          header: "got7",
          component: ConcertGot7,
          icon: null,
          subpath: false,
          children: [],
        },
        {
          path: "hypen",
          name: "hypen",
          header: "hypen",
          component: ConcertHypen,
          icon: null,
          subpath: false,
          children: [],
        },
        {
          path: "pixxie",
          name: "pixxie",
          header: "pixxie",
          component: ConcertPixxie,
          icon: null,
          subpath: false,
          children: [],
        },
        {
          path: "lykn",
          name: "lykn",
          header: "lykn",
          component: ConcertLykn,
          icon: null,
          subpath: false,
          children: [],
        },
        {
            path: "ticket-concet",
            name: "ticket-concet",
            header: "ticket-concet",
            component: TicketConcert,
            icon: null,
            children: [],
          },
        {
          path: "seat-concert",
          name: "seat-concert",
          header: "seat-concert",
          component: SeatConcert,
          icon: null,
          subpath: false,
          children: [
            {
              path: "payment-concert",
              name: "payment-concert",
              header: "payment-concert",
              component: PaymentConcert,
              icon: null,
              subpath: false,
              children: [
             
              ],
            },
          ],
        },
        {
          path: "concert-detail",
          name: "concert-detail",
          header: "concert-detail",
          component: ConcertDetail,
          icon: null,
          subpath: false,
          children: [
            {
              path: "stage-concert",
              name: "stage-concert",
              header: "stage-concert",
              component: StageConcert,
              icon: null,
              subpath: false,
              children: [],
            },
          ],
        },
      ],
    },
    {
      path: "/sport",
      name: "sport",
      header: "sport",
      component: Sport,
      icon: null,
      children: [
        {
          path: "ticket-sport",
          name: "ticket-sport",
          header: "ticket-sport",
          component: TicketSport,
          icon: null,
          children: [],
        },
        {
          path: "seat-sport",
          name: "seat-sport",
          header: "seat-sport",
          component: SeatSport,
          icon: null,
          subpath: false,
          children: [
            {
              path: "payment-sport",
              name: "payment-sport",
              header: "payment-sport",
              component: PaymentSport,
              icon: null,
              subpath: false,
              children: [
             
              ],
            },
          ],
        },
        {
          path: "sport-detail",
          name: "sport-detail",
          header: "sport-detail",
          component: SportDetail,
          icon: null,
          subpath: false,
          children: [
            {
              path: "stage-sport",
              name: "stage-sport",
              header: "stage-sport",
              component: StageSport,
              icon: null,
              subpath: false,
              children: [
               
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/promotion",
      name: "promotion",
      header: "promotion",
      component: Promotion,
      icon: null,
      children: [],
    },
    // {
    //     path: "/home-test",
    //     name: "llll",
    //     header: "tset2",
    //     component: HomeTest,
    //     icon: null,
    //     children: [],
    // },
    {
      path: "/information",
      name: "Information",
      header: "Information",
      component: Information,
      icon: null,
      children: [
        {
          path: "page1in",
          name: "TestPage",
          header: "TestPage",
          component: Page1Page,
          icon: null,
          subpath: false,
          children: [],
        },
      ],
    },
    {
      path: "/product",
      name: "product",
      header: "product",
      component: Product,
      icon: null,
      children: [],
    },
  
    {
      path: "/product/:id",
      name: "",
      header: "",
      component: ProductDetail,
      icon: null,
      children: [],
    },

    {
      path: "/payment",
      name: "",
      header: "",
      component: PaymentPage,
      icon: null,
      children: [],
    },
  ],
};
