import { useEffect, useState } from "react";
import '../styles/profile.css'
import AchivementBox from "../components/AchivementBox";
const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [pointsAndLevel, setPointsAndLevel] = useState(null);
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
    
        fetchProfileData();
        fetchPointsAndLevel();
      }, [])
    //   console.log('points and level data', pointsAndLevel)
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
            </div>
        </div>
    </div>
  )
}

export default Profile