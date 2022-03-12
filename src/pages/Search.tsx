import {
  IonButtons,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState, useEffect } from "react";

import PopularList from "../components/PopularList";

const Search = (): JSX.Element => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Array<Object>>([]);

  const formatResults = (results: any) => {
    return results
      .filter((r: any) => r.id.startsWith("tt"))
      .map((r: any) => ({
        ...r,
        title: r.l,
        title_cast: r.s,
        poster: r?.i?.imageUrl,
      }));
  };

  const search = async () => {
    const query = searchText.trim().toLowerCase();
    const url = `https://proxy.aagavin.workers.dev/?https://v2.sg.media-imdb.com/suggestion/${query.charAt(
      0
    )}/${query.replace(" ", "_")}.json`;
    return fetch(url, {
      credentials: "omit",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
      },
      referrer: "https://www.imdb.com/",
      method: "GET",
    })
      .then((r) => r.json())
      .then((r) => r?.d)
      .then(formatResults);
  };

  useEffect(() => {
    if (searchText) {
      search().then((r: Array<Object>) => {
        console.log(r);
        setSearchResults(r);
      });
    }
  }, [searchText]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonSearchbar onIonChange={(e) => setSearchText(e.detail.value!)} />
        {searchResults.length !== 0 && <PopularList items={searchResults} />}
      </IonContent>
    </IonPage>
  );
};

export default Search;
