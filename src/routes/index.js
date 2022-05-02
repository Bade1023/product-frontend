import PrivateRoutes from "./private-routes";
import PublicRoutes from "./public-routes";

const primaryRoutes = [
  {
    path: "/",
    component: PrivateRoutes,
  },
];

const publicRoutes = [
  {
    path: "/",
    component: PublicRoutes,
  },
];

export const routes = {
  primaryRoutes,
  publicRoutes,
};
