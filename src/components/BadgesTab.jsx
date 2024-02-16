import { useState } from "react";
import Badge from "./Badge";
import Model from "./Model";

const BadgesTab = ({badges}) => {
    const [modalVisible, setModalVisible] = useState(true);
    //   console.log("badges:", badges)
  return (
    <div className="badgesContainer">
        {badges && badges?.map((badge) => (
            <Badge key={badge.badgeId} image={badge.imageUrl} name={badge.name}  />
        ))}
        {modalVisible && <Model setModalVisible={setModalVisible} badge={badges[badges.length - 1]} modalVisible={modalVisible} />}
    </div>
  )
}

export default BadgesTab