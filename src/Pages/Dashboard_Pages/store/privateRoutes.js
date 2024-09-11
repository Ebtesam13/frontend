//? Icons
import { GiTemporaryShield } from "react-icons/gi";
import { PiPicnicTableBold } from "react-icons/pi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BiSolidOffer } from "react-icons/bi";
import { FaUser, FaUsers } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

//? Show pages
import ShowMeal from "../Pages/Meals/Show";
import ShowCategory from "../Pages/Categories/Show";
import ShowDiningTable from "../Pages/DiningTables/Show";
import ShowExtra from "../Pages/Extras/Show";
import ShowAddon from "../Pages/Addons/Show";
import ShowDeliveryOrder from "../Pages/DeliveryOrders/Show";
import ShowOffer from "../Pages/Offers/Show";
import ShowAdministrator from "../Pages/Administrators/Show";
import ShowCustomer from "../Pages/Customers/Show";
import DetailsOrder from "../Pages/Customers/DetailsOrder";
import ShowEmployee from "../Pages/Employees/Show";
import EditProfile from "../Pages/Profile/EditProfile";
import ChangePassword from "../Pages/Profile/ChangePassword";

const privateRoutes = [
  {
    path: "/admin/dashboard/meals/show/:id",
    name: "show meal",
    icon: GiTemporaryShield,
    component: ShowMeal,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/categories/show/:id",
    name: "show category",
    icon: GiTemporaryShield,
    component: ShowCategory,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/dining-tables/show/:id",
    name: "show dining table",
    icon: PiPicnicTableBold,
    component: ShowDiningTable,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/extras/show/:id",
    name: "show extra",
    icon: PiPicnicTableBold,
    component: ShowExtra,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/addons/show/:id",
    name: "show addon",
    icon: PiPicnicTableBold,
    component: ShowAddon,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/delivery-orders/show/:id",
    name: "show delivery order",
    icon: LuFileSpreadsheet,
    component: ShowDeliveryOrder,
    role: ["admin", "chef", "casher"],
  },
  {
    path: "/admin/dashboard/offers/show/:id",
    name: "show offer",
    icon: BiSolidOffer,
    component: ShowOffer,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/administrators/show/:id",
    name: "show Administrator",
    icon: FaUser,
    component: ShowAdministrator,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/customers/show/:id",
    name: "show Customer",
    icon: FaUsers,
    component: ShowCustomer,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/details-order/:id",
    name: "details order",
    icon: FaUsers,
    component: DetailsOrder,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/employees/show/:id",
    name: "show Employee",
    icon: FaUserGroup,
    component: ShowEmployee,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard/edit/profile",
    name: "edit profile",
    component: EditProfile,
    role: ["admin", "chef", "casher"],
  },
  {
    path: "/admin/dashboard/change/password",
    name: "change password",
    component: ChangePassword,
    role: ["admin", "chef", "casher"],
  },
];

export default privateRoutes;
