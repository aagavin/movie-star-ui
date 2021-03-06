import { IonApp, IonProgressBar, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, logIn, logOut, search, settings, star } from 'ionicons/icons';
import React, { FunctionComponent, Suspense, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth';

import UserContext, { getFavourites, init, setContext } from './context'
import { AppPage } from './declarations';
import { firebaseAppAuth } from './firebaseConfig';

import Menu from './components/Menu';

/* eslint-disable import/first */
const Home = React.lazy(() => import('./pages/Home'))

const Search = React.lazy(() => import('./pages/media/Search'));
const Media = React.lazy(() => import('./pages/media/MediaDetails'));
const Favourite = React.lazy(() => import('./pages/Favourite'));
const Settings = React.lazy(() => import('./pages/account/Settings'));
const SignUp = React.lazy(() => import('./pages/account/Signup'));
const Login = React.lazy(() => import('./pages/account/Login'));
const Logout = React.lazy(() => import('./pages/account/Logout'));

import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, DeviceInfo } from '@capacitor/core';
const { PushNotifications, Device } = Plugins;

/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/core/css/display.css';
// import '@ionic/core/css/flex-utils.css';
// import '@ionic/core/css/float-elements.css';
// import '@ionic/core/css/padding.css';
// import '@ionic/core/css/text-alignment.css';
// import '@ionic/core/css/text-transformation.css';

const commonPages: AppPage[] = [
  {
    mdIcon: home,
    iosIcon: home,
    title: 'Home',
    url: '/home'
  },
  {
    mdIcon: search,
    iosIcon: search,
    title: 'Search',
    url: '/search'
  },
];

const loggedInPages: AppPage[] = [
  {
    mdIcon: star,
    iosIcon: star,
    title: 'Favourites',
    url: '/favourite'
  },
  {
    mdIcon: settings,
    iosIcon: settings,
    title: 'Settings',
    url: '/settings'
  },
  {
    mdIcon: logOut,
    iosIcon: logOut,
    title: 'Logout',
    url: '/account/logout'
  }
];

const loggedOutPages: AppPage[] = [
  {
    mdIcon: logIn,
    iosIcon: logIn,
    title: 'Login',
    url: '/account/login'
  }
];

const redirectHome = () => <Redirect to="/home" />;

const App: FunctionComponent = (props: any) => {

  const [pages, setPages] = useState<AppPage[]>(commonPages);
  const [ctx, setCtx] = useState<any>({});

  useEffect(() => {
    setCtx(init);

    Device.getInfo().then((info: DeviceInfo) => {
      if (info.platform !== 'web') {
        PushNotifications.register();

        PushNotifications.addListener('registration', (token: PushNotificationToken) => console.info('successfully registered'));
        PushNotifications.addListener('registrationError', (err: any) => alert('Error on registration: ' + JSON.stringify(err)));
        PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotification) => {
            console.log('pushNotificationReceived');
            alert('pushNotificationReceived')
            alert(JSON.stringify({ id: notification.id, title: notification.title, body: notification.body }));
            console.log();
          });

        PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: PushNotificationActionPerformed) => {
            console.log('pushNotificationActionPerformed')
            console.log({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body })
          });
      }
    });


  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setContext(setCtx, ctx, props);

    if (props.user) {
      getFavourites(props.user.uid)
        .then(favsDoc => setContext(setCtx, ctx, props, Object.values(favsDoc.data())))
        .catch(e => new Error(e.message));
      setPages([...commonPages, ...loggedInPages]);
    }
    else {
      setPages([...commonPages, ...loggedOutPages]);
    }
  }, [props]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <IonApp>
      <Suspense fallback={<IonProgressBar type="indeterminate" />}>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <UserContext.Provider value={ctx}>
              <Menu appPages={pages} />
              <IonRouterOutlet id="main">
                <Route path="/home" component={Home} exact />
                <Route path="/home/media/:catogery/:mediaId" component={Media} exact />
                <Route path="/search" component={Search} exact />
                <Route path="/favourite" component={Favourite} exact />
                <Route path="/settings" component={Settings} extct />
                <Route path="/account/login" component={Login} exact />
                <Route path="/account/logout" component={Logout} exact />
                <Route path="/account/signup" component={SignUp} exact />
                <Route exact path="/" render={redirectHome} />
              </IonRouterOutlet>
            </UserContext.Provider>
          </IonSplitPane>
        </IonReactRouter>
      </Suspense>
    </IonApp>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
