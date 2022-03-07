import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonSkeletonText, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

interface MediaProps
  extends RouteComponentProps<{
    mediaId: string;
  }> { }

export interface MediaObj {
  originalTitle?: string;
  titleType?: string;
  startYear?: string;
  runtimeMinutes?: string;
  primaryTitle?: string;
  tconst?: string;
  isAdult?: string;
  endYear?: string;
  genres?: string;
  posterUrl?: string;
  description?: string;
}

const Media: React.FC<MediaProps> = ({ match }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<MediaObj>({});



  useEffect(() => {

    const mediaId = match.params.mediaId;

    const getMedia = async () => {
      setIsLoading(true);
      const mediaReq = await fetch(`https://api.aagavin.ca/media/${mediaId}`).then(r => r.json());
      const posterReq = await fetch(`https://api.aagavin.ca/media/${mediaId}/poster`).then(r => r.json());
      const webDataReq = await fetch(`https://api.aagavin.ca/media/${mediaId}/webdata`).then(r => r.json());

      const [mediaRes, posterRes, webDataRes] = await Promise.allSettled([mediaReq, posterReq, webDataReq]);

      const media = {};
      if (mediaRes.status === 'fulfilled') {
        Object.assign(media, mediaRes.value);
      }

      if (posterRes.status === 'fulfilled') {
        Object.assign(media, posterRes.value);
      }

      if (webDataRes.status === 'fulfilled') {
        Object.assign(media, webDataRes.value);
      }

      setMedia(media);
      localStorage.setItem(match.params.mediaId, JSON.stringify(media));
      setIsLoading(false);
    }

    const mediaCache = localStorage.getItem(mediaId);
    if (mediaCache === null) {
      getMedia();
    }
    else {
      setMedia(JSON.parse(mediaCache));
    }
  }, [match.params.mediaId])


  if (isLoading) {
  }

  const getLoading = () => (
    <IonCard>
    <IonCardHeader>
      <IonSkeletonText animated style={{ height: '3em' }} />
      <IonCardTitle><IonSkeletonText animated /></IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <IonSkeletonText animated />
    </IonCardContent>
  </IonCard>
  )

  const getMediaCard = () => (
    <IonCard>
    <img src={media.posterUrl?.replace(/_V1_.*jpg/i, '.jpg')} alt={`poster for ${media.primaryTitle}`} />
    <IonCardHeader>
      <IonCardSubtitle>{media.startYear} {media.endYear === '\\N' ? null : `-${media.endYear}`}</IonCardSubtitle>
      <IonCardTitle>{media.originalTitle}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      {media.description}
    </IonCardContent>
  </IonCard>
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Media</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {isLoading ? getLoading() :getMediaCard() }
      </IonContent>
    </IonPage>
  )
}

export default Media;