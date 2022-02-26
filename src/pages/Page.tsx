import { IonButtons, IonContent, IonHeader, IonLabel, IonMenuButton, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import PopularList from '../components/PopularList';
import './Page.css';

const Page: React.FC = () => {

  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [segment, setSegment] = useState('movies');

  const getMovies = async () => {
    const resp = await fetch('https://api.aagavin.ca/media/movie/popular').then(r => r.json());
    setMovies(resp);
  };

  const getTv = async () => {
    const resp = await fetch('https://api.aagavin.ca/media/tv/popular').then(r => r.json());
    setTv(resp);
  };

  useEffect(() => {
    getMovies();

  }, []);

  useEffect(() => {
    if (segment === 'tv' && tv.length === 0) {
      getTv();
    }
  }, [segment, tv])

  const onChange = (e: any) => {
    setSegment(e.detail.value)
  }

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
            <IonSegmentButton value="tv"><IonLabel>tv</IonLabel></IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        <PopularList items={segment === 'movies' ? movies : tv} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
