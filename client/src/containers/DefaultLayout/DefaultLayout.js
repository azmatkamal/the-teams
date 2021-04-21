import React, { Component, Suspense } from "react";
import { Redirect, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
import { logoutUser } from "../../redux/auth/action";
import PrivateRoute from "../../utils/privateRoute";
// routes config
import routes from "../../routes";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  componentDidMount() {
    if (this.props.auth) {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.push("/login");
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.auth) {
      if (!nextProps.auth.isAuthenticated) {
        this.props.history.push("/login");
      }
    }
  }

  signOut(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              onLogout={(e) => this.signOut(e)}
              user={this.props.auth.isAuthenticated ? this.props.auth.user : {}}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <PrivateRoute
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { logoutUser })(
  withRouter(DefaultLayout)
);
