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
import { getAuth } from "firebase/auth";
import {
  homeOutline,
  home,
  searchOutline,
  search,
  logInOutline,
  logIn,
  logOutOutline,
  logOut
} from "ionicons/icons";
import "../firebase";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const auth = getAuth();
const appPages: AppPage[] = [
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

console.log(auth.currentUser);
if (auth.currentUser) {
  appPages.push({
    title: "Log Out",
    url: "/logout",
    iosIcon: logOutOutline,
    mdIcon: logOut,
  });
} else if (!auth.currentUser) {
  appPages.push({
    title: "Login",
    url: "/login",
    iosIcon: logInOutline,
    mdIcon: logIn,
  });
}

const Menu: React.FC = () => {
  const location = useLocation();

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
