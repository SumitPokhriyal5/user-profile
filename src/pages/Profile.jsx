import { useEffect, useState } from "react";
import '../styles/profile.css'
import AchivementBox from "../components/AchivementBox";
import BadgesTab from "../components/BadgesTab";
import PointHistoryTab from "../components/PointHistoryTab";
const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const [pointsAndLevel, setPointsAndLevel] = useState({});
    const [rank, setRank] = useState("");
    const [badges, setBadges] = useState([])
    const [activeTab, setActiveTab] = useState("PointHistory");

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };
    const apiCredentials = {
        url: "https://staging.questprotocol.xyz",
        userId: "u-a2399489-9cd0-4c94-ad12-568379202b08",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWEyMzk5NDg5LTljZDAtNGM5NC1hZDEyLTU2ODM3OTIwMmIwOCIsImlhdCI6MTcwNzk4NzYyOSwiZXhwIjoxNzA4NTkyNDI5fQ.fESDqKunAqLUgHBCUsNYpGcNrTeVEty91HqGebX59Uc",
        apiKey: "k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be",
        entityId: "e-0000000000",
        secretKey: "profile-data-quest-labs"
    };
    const headers = {
        'apikey': apiCredentials.apiKey,
        'apisecret': apiCredentials.secretKey, 
        'userid': apiCredentials.userId,
        'token': apiCredentials.token,
        'Content-Type': 'application/json'
      }

       
    useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const response = await fetch(`${apiCredentials.url}/api/users/${apiCredentials.userId}`, {
                headers
            });
            if (!response.ok) {
              throw new Error('Failed to fetch profile data');
            }
            const data = await response.json();
            setProfileData(data.data);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        }

        const fetchPointsAndLevel = async () => {
            try {
              const response = await fetch(`${apiCredentials.url}/api/entities/${apiCredentials.entityId}/users/${apiCredentials.userId}/xp`, {
                  headers
              });
              if (!response.ok) {
                throw new Error('Failed to fetch points and level data');
              }
              const data = await response.json();
              setPointsAndLevel(data);
            } catch (error) {
              console.error('Error fetching points and level data:', error);
            }
        };

        const fetchRank = async () => {
            try {
              const response = await fetch(`${apiCredentials.url}/api/entities/${apiCredentials.entityId}/users/${apiCredentials.userId}/xp-leaderboard-rank`, {
                  headers
              });
              if (!response.ok) {
                throw new Error('Failed to fetch points and level data');
              }
              const data = await response.json();
              setRank(data.data.position);
            } catch (error) {
              console.error('Error fetching points and level data:', error);
            }
        };

        const fetchBadges = async () => {
            try {
              const response = await fetch(`${apiCredentials.url}/api/entities/${apiCredentials.entityId}/users/${apiCredentials.userId}/badges`, {
                  headers
              });
              if (!response.ok) {
                throw new Error('Failed to fetch points and level data');
              }
              const data = await response.json();
              setBadges(data.data);
            } catch (error) {
              console.error('Error fetching points and level data:', error);
            }
        };

        
        fetchProfileData();
        fetchPointsAndLevel();
        fetchRank();
        fetchBadges()
      }, [])
    //   console.log('Rank data', rank)
  return (
    <div className="profilePage">
        <h1>Profile</h1>
        <div>
            <div className="userAvatarBox">
                <img src={profileData?.imageUrl} alt={profileData?.name} />
            </div>
            <h2>{profileData?.name}</h2>
            <div className="userAchievementContainer">
                <AchivementBox value={pointsAndLevel.data} title={"Points"} />
                <AchivementBox value={`#${rank}`} title={"Ranks"} />
                <AchivementBox value={pointsAndLevel.data} title={"Points"} />
            </div>
            <div className="tabContainer">
            <div className="tabButtons">
                <button >Membership</button>
                <button className={activeTab === "Badges" ? "activeTab" : ""} onClick={() => handleTabChange("Badges")}>Badges</button>
                <button className={activeTab === "PointHistory" ? "activeTab" : ""} onClick={() => handleTabChange("PointHistory")}>Point History</button>
            </div>
            <div className="tabContent">
                {activeTab === "Badges" && <BadgesTab badges={badges} />}
                {activeTab === "PointHistory" && <PointHistoryTab />}
            </div>
            </div>
        </div>
    </div>
  )
}

export default Profile