import React from "react";
import { Route, Switch } from "react-router";
import HomePage from "../components/HomePage/HomePage.component";
import NotFound from "../components/NotFound/NotFound.component";
import ProductPage from "../components/ProductPage/ProductPage.component";
import withPageTitle from "../components/withPageTitle/withPageTitle.component";

const ProductPageComponent = withPageTitle({
  component: ProductPage,
  title: '252 Product Page'
})

const HomePageComponent = withPageTitle({
  component: HomePage,
  title: '252 Home Page'
})

const NotFoundComponent = withPageTitle({
  component: NotFound,
  title: 'Error 404',
});

export default function PrivateRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePageComponent} />
      <Route exact path="/product" component={ProductPageComponent} />
      <Route path='*' component={NotFoundComponent} />
    </Switch>
  );
}