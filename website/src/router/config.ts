const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/register", "/register"],
    exact: true,
    component: "Register",
  },
  {
    path: ["/establishment", "/establishment"],
    exact: true,
    component: "Establishments",
  },
];

export default routes;
