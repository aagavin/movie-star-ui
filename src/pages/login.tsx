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
  useIonToast,
} from "@ionic/react";
import { Link, RouteComponentProps } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

interface LoginProps extends RouteComponentProps<{}> {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [present] = useIonToast();

  useEffect(() => {
    console.log(getAuth().currentUser);
    if (getAuth().currentUser !== null) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = async () => {
    if (username === "" || password === "") {
      present({ message: "Error with username or password", duration: 2000 });
      setIsLoggedIn(false);
      return;
    }
    console.log('----')
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, username, password);
      present({ message: "Successfully logged in", duration: 2000 });
      history.push("/");
      setIsLoggedIn(true);
    }
    catch (err: any) {

      present({ message: `Error with login ${err.message}`, duration: 2000 });
    }

  };

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
              <IonInput
                placeholder="Username"
                type="email"
                value={username}
                required
                onIonChange={(e) => setUsername(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonInput
                placeholder="Password"
                type="password"
                value={password}
                required
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={login}>
                    Login
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand="block"
                    onClick={() => {
                      setUsername("");
                      setPassword("");
                    }}
                  >
                    Clear
                  </IonButton>
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
        {isLoggedIn ? loggedInContent() : loggedOutContent()}
      </IonContent>
    </IonPage>
  );
};

export default Login;
