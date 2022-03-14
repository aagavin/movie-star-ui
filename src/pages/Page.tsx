import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import PopularList from "../components/PopularList";
import "./Page.css";

const Page: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [segment, setSegment] = useState("movies");

  const getMedia = async (mediaType: string) => {
    const popMedia = sessionStorage.getItem(`pop${mediaType}`);
    if (popMedia !== null) {
      mediaType === "movie"
        ? setMovies(JSON.parse(popMedia))
        : setTv(JSON.parse(popMedia));
    } else {
      const resp = await fetch(
        `https://api.aagavin.ca/media/${mediaType}/popular`
      ).then((r) => r.json());

      mediaType === "movie"
        ? setMovies(resp)
        : setTv(resp);
      sessionStorage.setItem(`pop${mediaType}`, JSON.stringify(resp));
    }
  };

  useEffect(() => {
    getMedia("movie");
  }, []);

  useEffect(() => {
    if (segment === "tv" && tv.length === 0) {
      getMedia("tv");
    }
  }, [segment, tv]);

  const onChange = (e: any) => {
    setSegment(e.detail.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Popular Movies</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonToolbar>
          <IonSegment value={segment} onIonChange={onChange}>
            <IonSegmentButton value="movies">
              <IonLabel>movies</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="tv">
              <IonLabel>tv</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        <div style={{ display: segment === "movies" ? "inherit" : "none" }}>
          <PopularList items={movies} />
        </div>
        <div style={{ display: segment === "tv" ? "inherit" : "none" }}>
          <PopularList items={tv} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
