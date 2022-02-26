import { IonList, IonImg, IonItem, IonLabel, IonNote, IonAvatar } from "@ionic/react"
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
            <IonItem>
              <IonAvatar slot="start" class="avatar">
                <IonImg src={item.poster} alt={`poster for ${item.title}`} />
              </IonAvatar>
              <IonLabel>
                <h2>{item.title}</h2>
                <h3>{item.title_cast}</h3>
                <IonNote slot="end">raiting	{item.raiting}</IonNote>
              </IonLabel>
            </IonItem>)
        })}
      </IonList>
    </>
  )

}

export default PopularList