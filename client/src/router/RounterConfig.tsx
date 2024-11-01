import { MainRouter } from "../interface/Router.interface"
import Dashboard from "../views/dashboard/DashBoard"

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
            path: "/dashboard",
            name: "แดชบอร์ด",
            header: "แดชบอร์ด",
            component: Dashboard,
            icon: null,
            children: [],
        },
       
    ],

}
