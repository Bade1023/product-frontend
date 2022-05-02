import React from "react";
import { Route, Switch } from "react-router";
import HomePage from "../components/HomePage/HomePage.component";
import withPageTitle from "../components/withPageTitle/withPageTitle.component";

const LoginPage = React.lazy(() => import("../modules/LoginPage"));

const HomePageComponent = withPageTitle({
  component: HomePage,
  title: '252 Home Page'
})

export default function PublicRoutes() {
  return (
    <Switch>
      {/** Үндсэн нэвтрэх хуудас юм уу үндсэн нүүр хуудасны дуудах Component тохируулаж өгөх */}
      <Route exact path="/" component={HomePageComponent} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  );
}
