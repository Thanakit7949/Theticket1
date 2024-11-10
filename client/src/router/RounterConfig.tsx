import { MainRouter } from "../interface/Router.interface"
import Dashboard from "../views/dashboard/DashBoard"
import Concert from "../views/User/Concert"
import ConcertDetail from "../views/User/ConcertDetail"
import ConcertBus from "../views/User/detailconcert/ConcertBus"
import ConcertGot7 from "../views/User/detailconcert/ConcertGot7"
import ConcertHypen from "../views/User/detailconcert/ConcertHypen"
import ConcertLykn from "../views/User/detailconcert/ConcertLykn"
import ConcertPixxie from "../views/User/detailconcert/ConcertPixxie"
import HomeTest from "../views/User/HomeTest"
import HomeUser from "../views/User/HomeUser"
import Information from "../views/User/Information"
import Page1Page from "../views/User/Page1"
import PaymentPage from "../views/User/PaymentPage"
import Product from "../views/User/Product"
import ProductDetail from "../views/User/ProductDetail"

export const routesConfig: {
    publicRoute: MainRouter[]
    privateRoute: MainRouter[]
} = {
    publicRoute: [
        {
            path: "*",
            // component: <NotFoundPage />,
            component:'',
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
                    icon:null,
                    subpath: false,
                    children: [],
                },
                {
                    path: "got7",
                    name: "got7",
                    header: "got7",
                    component: ConcertGot7,
                    icon:null,
                    subpath: false,
                    children: [],
                },
                {
                    path: "hypen",
                    name: "hypen",
                    header: "hypen",
                    component: ConcertHypen,
                    icon:null,
                    subpath: false,
                    children: [],
                },
                {
                    path: "pixxie",
                    name: "pixxie",
                    header: "pixxie",
                    component: ConcertPixxie,
                    icon:null,
                    subpath: false,
                    children: [],
                },
                {
                    path: "lykn",
                    name: "lykn",
                    header: "lykn",
                    component: ConcertLykn,
                    icon:null,
                    subpath: false,
                    children: [],
                },
                {
                    path: "concert-detail",
                    name: "concert-detail",
                    header: "concert-detail",
                    component: ConcertDetail,
                    icon:null,
                    subpath: false,
                    children: [],
                },
            ],
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
                    icon:null,
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
            component: ProductDetail ,
            icon: null,
            children: [],
        },

        {
            path: "/payment",
            name: "",
            header: "",
            component: PaymentPage ,
            icon: null,
            children: [],
        },

        
    ],

}
