import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
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
  IonBackButton,
  useIonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { RouteComponentProps } from "react-router-dom";

interface LoginProps extends RouteComponentProps<{}> {}

const CreateAccount: React.FC<LoginProps> = ({ history }) => {
  const [userName, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRep, setPasswordRep] = useState<string>("");
  const [auth, setAuth] = useState<Auth>();

  const [present] = useIonAlert();

  useEffect(() => {
    const auth = getAuth();
    setAuth(auth);
    if (auth.currentUser) {
      history.replace("/");
    }
  }, [history]);


  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const newAccount = () => {
    if (userName.length > 1 && !validateEmail(userName)){
      present({
        message: "Email is not valid!",
        buttons: ["Ok"],
      });
      return
    }
    if (password !== passwordRep) {
      present({
        message: "Password & Confirm Password don't match",
        buttons: ["Ok"],
      });
    } else {
      createUserWithEmailAndPassword(auth!, userName, password)
        .then()
        .catch(console.error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Create an Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Create :</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
              <IonList>
                <IonItem>
                  <IonInput
                    onIonChange={(e) => setUsername(e.detail.value!)}
                    pattern="email"
                    inputMode="email"
                    required
                    type="email"
                    placeholder="Username"
                  />
                </IonItem>

                <IonItem>
                  <IonInput
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    type="password"
                    placeholder="Password"
                  />
                </IonItem>

                <IonItem>
                  <IonInput
                    onIonChange={(e) => setPasswordRep(e.detail.value!)}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </IonItem>

                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton onClick={newAccount} expand="block">
                        Create
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton expand="block">Clear</IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;
