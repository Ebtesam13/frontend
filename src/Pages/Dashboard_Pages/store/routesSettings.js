// icons
import { RiCommunityLine } from "react-icons/ri";
import { SiSitecore } from "react-icons/si";
import { FaCodeBranch } from "react-icons/fa6";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegAddressCard } from "react-icons/fa6";
import { GrAnalytics } from "react-icons/gr";
import { FaFeather } from "react-icons/fa6";
import { MdCurrencyExchange } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { FaBattleNet } from "react-icons/fa";
import { TbReceiptTax } from "react-icons/tb";
import { RiPagesLine } from "react-icons/ri";
import { BsPersonCheck } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { TbLicense } from "react-icons/tb";

// component
import Company from "../Pages/Settings/Models/Company";
import Site from "../Pages/Settings/Models/Site";
import Branched from "../Pages/Settings/Models/Branches";
import Mail from "../Pages/Settings/Models/Mail";
import OTP from "../Pages/Settings/Models/OTP";
import Notification from "../Pages/Settings/Models/Notification";
import NotificationAlert from "../Pages/Settings/Models/NotificationAlert";
import Analytics from "../Pages/Settings/Models/Analytics";
import Theme from "../Pages/Settings/Models/Theme";
import Currencies from "../Pages/Settings/Models/Currencies";
import ItemCategories from "../Pages/Settings/Models/ItemCategories";
import ItemAttributes from "../Pages/Settings/Models/ItemAttributes";
import Taxes from "../Pages/Settings/Models/Taxes";
import Pages from "../Pages/Settings/Models/Pages";
import Roles from "../Pages/Settings/Models/Roles";
import SmsGateway from "../Pages/Settings/Models/SmsGateway";
import PaymentGateway from "../Pages/Settings/Models/PaymentGateway";
import License from "../Pages/Settings/Models/License";

const routesSettings = [
  {
    path: "/settings/company",
    name: "company",
    icon: RiCommunityLine,
    component: Company,
    role: ["admin"],
  },
  {
    path: "/settings/site",
    name: "site",
    icon: SiSitecore,
    component: Site,
    role: ["admin"],
  },
  {
    path: "/settings/branches",
    name: "branches",
    icon: FaCodeBranch,
    component: Branched,
    role: ["admin"],
  },
  {
    path: "/settings/mail",
    name: "mail",
    icon: MdOutlineMarkEmailUnread,
    component: Mail,
    role: ["admin"],
  },
  {
    path: "/settings/otp",
    name: "otp",
    icon: FaLock,
    component: OTP,
    role: ["admin"],
  },
  {
    path: "/settings/notification",
    name: "notification",
    icon: IoMdNotificationsOutline,
    component: Notification,
    role: ["admin"],
  },
  {
    path: "/settings/notification-alert",
    name: "notification alert",
    icon: FaRegAddressCard,
    component: NotificationAlert,
    role: ["admin"],
  },
  {
    path: "/settings/analytic",
    name: "analytic",
    icon: GrAnalytics,
    component: Analytics,
    role: ["admin"],
  },
  {
    path: "/settings/theme",
    name: "theme",
    icon: FaFeather,
    component: Theme,
    role: ["admin"],
  },
  {
    path: "/settings/currencies",
    name: "currencies",
    icon: MdCurrencyExchange,
    component: Currencies,
    role: ["admin"],
  },
  {
    path: "/settings/item-categories",
    name: "item categories",
    icon: TbCategory,
    component: ItemCategories,
    role: ["admin"],
  },
  {
    path: "/settings/item-attributes",
    name: "item attributes",
    icon: FaBattleNet,
    component: ItemAttributes,
    role: ["admin"],
  },
  {
    path: "/settings/taxes",
    name: "taxes",
    icon: TbReceiptTax,
    component: Taxes,
    role: ["admin"],
  },
  {
    path: "/settings/pages",
    name: "pages",
    icon: RiPagesLine,
    component: Pages,
    role: ["admin"],
  },
  {
    path: "/settings/roles-permissions",
    name: "roles & permissions",
    icon: BsPersonCheck,
    component: Roles,
    role: ["admin"],
  },
  {
    path: "/settings/sms-gateway",
    name: "sms gateway",
    icon: TiMessages,
    component: SmsGateway,
    role: ["admin"],
  },
  {
    path: "/settings/payment-gateway",
    name: "payment gateway",
    icon: RiMoneyEuroCircleLine,
    component: PaymentGateway,
    role: ["admin"],
  },
  {
    path: "/settings/license",
    name: "license",
    icon: TbLicense,
    component: License,
    role: ["admin"],
  },
];

export default routesSettings;
