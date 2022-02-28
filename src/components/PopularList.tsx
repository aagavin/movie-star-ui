import { IonList, IonImg, IonItem, IonLabel, IonNote, IonThumbnail } from "@ionic/react"
import './PopularList.css'
interface PopularListProps {
  items: Array<any>;
}

const PopularList: React.FC<PopularListProps> = ({ items }) => {
  return (
    <>
      <IonList>
        {items.map(item => {
          return (
            <IonItem detail button key={item.id} routerLink={`/media/${item.id}`}>
              <IonThumbnail slot="start" class="avatar">
                <IonImg src={item.poster} alt={`poster for ${item.title}`} />
              </IonThumbnail>
              <IonLabel>
                <h2 className="ion-text-wrap">{item.title}</h2>
                <h3 className="ion-text-wrap">{item.title_cast}</h3>
                <IonNote slot="end">raiting	{item.raiting}</IonNote>
              </IonLabel>
            </IonItem>)
        })}
      </IonList>
    </>
  )

}

export default PopularList