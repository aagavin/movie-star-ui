import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonList,
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { Link, RouteComponentProps } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

interface LoginProps extends RouteComponentProps<{}> {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!getAuth().currentUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = async () => {
    await getAuth().signOut();
    history.push("/");
    setIsLoggedIn(false);
  };

  const loggedOutContent = () => (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Login into your account:</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonList>
            <IonItem>
              <IonInput placeholder="Username" />
            </IonItem>

            <IonItem>
              <IonInput placeholder="Password" />
            </IonItem>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton expand="block">Login</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block">Clear</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonList>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          need an account? <Link to="/login/create">Create an accout</Link>
        </IonCardContent>
      </IonCard>
    </>
  );

  const loggedInContent = () => (
    <>
      <IonCard>
        <IonCardContent>
          <p>Your already logged in</p>
          <br />
          <IonButton routerLink="/" expand="block">
            Go Home
          </IonButton>
          <IonButton onClick={logout} expand="block">
            Logout
          </IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoggedIn ? loggedOutContent() : loggedInContent()}
      </IonContent>
    </IonPage>
  );
};

export default Login;
