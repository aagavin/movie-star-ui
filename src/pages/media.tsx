import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import AddToFavButton from "../components/AddToFavBtn";
import "./media.css";

interface MediaProps
  extends RouteComponentProps<{
    mediaId: string;
  }> {}

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

interface EpisodeObj {
  parentTconst: string;
  episodeNumber: number;
  tconst: string;
  seasonNumber: number;
}

const Media: React.FC<MediaProps> = ({ match }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<MediaObj>({});
  const [episodes, setEpisodes] = useState<EpisodeObj[]>([]);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    const mediaId = match.params.mediaId;

    const getMedia = async () => {
      const mediaReq = fetch(`https://api.aagavin.ca/media/${mediaId}`).then(
        (r) => r.json()
      );
      const webDataReq = fetch(
        `https://api.aagavin.ca/media/${mediaId}/webdata`
      ).then((r) => r.json());

      const [mediaRes, webDataRes] = await Promise.allSettled([
        mediaReq,
        webDataReq,
      ]);

      const media = {};
      if (mediaRes.status === "fulfilled") {
        Object.assign(media, mediaRes.value);
      }

      if (webDataRes.status === "fulfilled") {
        Object.assign(media, webDataRes.value);
      }

      return media;
    };

    const mediaCache = localStorage.getItem(mediaId);
    if (mediaCache === null) {
      setIsLoading(true);
      getMedia().then((r) => {
        setMedia(r);
        localStorage.setItem(mediaId, JSON.stringify(r));
        setIsLoading(false);
      });
    } else {
      setMedia(JSON.parse(mediaCache));
    }
  }, [match.params.mediaId]);

  useEffect(() => {
    if (["tvMiniSeries", "tvSeries"].includes(media?.titleType!)) {
      fetch(`https://api.aagavin.ca/media/${media.tconst}/episodes`)
        .then((r) => r.json())
        .then((r) => setEpisodes(r))
        .catch(console.error);
    }
  }, [media]);

  const getLoading = () => (
    <IonCard>
      <IonCardHeader>
        <IonSkeletonText animated style={{ height: "3em" }} />
        <IonCardTitle>
          <IonSkeletonText animated />
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonSkeletonText animated />
      </IonCardContent>
    </IonCard>
  );

  const getMediaCard = () => (
    <>
      <IonCard>
        <img
          id="posterImage"
          src={media.posterUrl
            ?.replace(/_V1_.*jpg/i, ".jpg")
            .replace(/_V1_.*webp/i, "")}
          alt={`poster for ${media.primaryTitle}`}
        />
        <IonCardHeader>
          <IonCardSubtitle>
            {media.startYear}{" "}
            {media.endYear === "\\N" ? null : `-${media.endYear}`}
          </IonCardSubtitle>
          <IonCardTitle>{media.originalTitle}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{media.description}</IonCardContent>
      </IonCard>
      <AddToFavButton />
    </>
  );

  const getEpisodesCard = () => {
    const seasonsNumbers = episodes.map((e) => e.seasonNumber);
    const seasons = Array.from(new Set<number>(seasonsNumbers));
    const epSeasonsNum = episodes
      .filter((e) => e.seasonNumber === selectedSeason)
      .map((e) => e.episodeNumber)
      .sort((x, y) => x - y);

    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Seasons</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonSegment
            onIonChange={(e) =>
              setSelectedSeason(parseInt(e.detail.value + ""))
            }
            scrollable={true}
          >
            {seasons.map((s) => (
              <IonSegmentButton value={`${s}`} key={s}>
                <IonLabel>Season {s}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
          <IonList>
            {epSeasonsNum.map((epNum) => (
              <IonItem key={epNum}>
                <IonLabel>Episode: {epNum}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/popular" />
          </IonButtons>
          <IonTitle>Media</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {isLoading ? getLoading() : getMediaCard()}
        {episodes.length !== 0 && getEpisodesCard()}
      </IonContent>
    </IonPage>
  );
};

export default Media;
