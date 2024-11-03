import { MainRouter } from "../interface/Router.interface"
import Dashboard from "../views/dashboard/DashBoard"
import HomeTest from "../views/User/HomeTest"
import HomeUser from "../views/User/HomeUser"
import Information from "../views/User/Information"
import Page1Page from "../views/User/Page1"

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
            path: "/home-user",
            name: "test",
            header: "tset",
            component: HomeUser,
            icon: null,
            children: [],
        },
        {
            path: "/home-test",
            name: "test2",
            header: "tset2",
            component: HomeTest,
            icon: null,
            children: [],
        },
        {
            path: "/Information",
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
       
    ],

}
