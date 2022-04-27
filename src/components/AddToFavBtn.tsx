import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { IonButton, IonCard, IonCardContent } from "@ionic/react";

const AddToFavouriteButton = () => {

  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);


  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  });


  if (!isLoggedin) {
    return null;
  }


  return (
    <IonCard>
      <IonCardContent>
        <IonButton expand="block">Add to Favourite</IonButton>
      </IonCardContent>
    </IonCard>
  );

};

export default AddToFavouriteButton;
