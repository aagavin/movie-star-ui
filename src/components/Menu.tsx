import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  homeOutline,
  home,
  searchOutline,
  search,
  logInOutline,
  logIn,
  logOutOutline,
  logOut,
} from "ionicons/icons";
import "../firebase";
import "./Menu.css";
import { useEffect, useState } from "react";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const defAppPages = [
  {
    title: "Home",
    url: "/popular",
    iosIcon: homeOutline,
    mdIcon: home,
  },
  {
    title: "Search",
    url: "/search",
    iosIcon: searchOutline,
    mdIcon: search,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  const [appPages, setAppPages] = useState<AppPage[]>([]);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {

      if (user) {
        setAppPages([
          ...defAppPages,
          {
            title: "Log Out",
            url: "/logout",
            iosIcon: logOutOutline,
            mdIcon: logOut,
          },
        ]);
      } else {

        setAppPages([
          ...defAppPages,
          {
            title: "Login",
            url: "/login",
            iosIcon: logInOutline,
            mdIcon: logIn,
          },
        ]);

      }
    });
  }, []);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Movie Star</IonListHeader>
          <IonNote></IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
