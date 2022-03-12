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
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccount: React.FC = () => {

  const [userName, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRep, setPasswordRep] = useState<string>("");

  useEffect(()=>{
    const auth = getAuth();
    console.log('------>');
    console.log(auth.currentUser);
  }, []);

  const newAccount = () => {
    const auth = getAuth();
    if (auth.currentUser !== null) {
      auth.signOut().then(console.log).catch(console.error);
    }
    createUserWithEmailAndPassword(auth, userName, password)
      .then((userCred) => {
        const user = userCred.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
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
                  placeholder="Password repeat"
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
