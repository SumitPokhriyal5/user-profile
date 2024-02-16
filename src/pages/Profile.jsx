import { useEffect, useState } from "react";
import '../styles/profile.css'
const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const apiCredentials = {
        userId: "u-a2399489-9cd0-4c94-ad12-568379202b08",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWEyMzk5NDg5LTljZDAtNGM5NC1hZDEyLTU2ODM3OTIwMmIwOCIsImlhdCI6MTcwNzk4NzYyOSwiZXhwIjoxNzA4NTkyNDI5fQ.fESDqKunAqLUgHBCUsNYpGcNrTeVEty91HqGebX59Uc",
        apiKey: "k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be",
        entityId: "e-0000000000",
        secretKey: "profile-data-quest-labs"
    };
    useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const response = await fetch(`https://staging.questprotocol.xyz/api/users/${apiCredentials.userId}`, {
                headers: {
                    'apikey': apiCredentials.apiKey,
                    'apisecret': apiCredentials.secretKey, 
                    'userid': apiCredentials.userId,
                    'token': apiCredentials.token,
                    'Content-Type': 'application/json'
                  }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch profile data');
            }
            const data = await response.json();
            setProfileData(data.data);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
    
        fetchProfileData();
      }, []);
    //   console.log('profile data', profileData)
  return (
    <div className="profilePage">
        <h1>Profile</h1>
        <div>
            <div className="userAvatarBox">
                <img src={profileData.imageUrl} alt={profileData.name} />
            </div>
            <h2>{profileData.name}</h2>
        </div>
    </div>
  )
}

export default Profile