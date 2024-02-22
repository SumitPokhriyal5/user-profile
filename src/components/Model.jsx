import { useEffect } from "react";
import '../styles/model.css'
import Confetti from "react-confetti";
const Model = ({setModalVisible, badge, modalVisible}) => {
    useEffect(() => {
        const modalElement = document.querySelector(".modal");
        modalElement.classList.add("celebration"); 
        return () => {
            modalElement.classList.remove("celebration"); 
        };
    }, []);
    
  return (
        <div className="modal">
            {modalVisible && <Confetti recycle={false} />}
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <div>
              <img src={badge?.imageUrl} alt={badge?.name} />
              <h2>Badge Unlocked! 🌟</h2>
              <p>🎉 Level Up! Earned a shiny new badge! 🥇✨</p>
            </div>
          </div>
        </div>
      
  )
}

export default Model