import { useEffect, useState } from "react";
import "../styles/profile.css";
import AchivementBox from "../components/AchivementBox";
import BadgesTab from "../components/BadgesTab";
import { FaChevronLeft } from "react-icons/fa";

const initialBadgeData = [
  {
    badgeId: 1,
    imageUrl: "https://thumbs.dreamstime.com/b/police-badge-icon-simple-style-white-background-vector-illustration-79584651.jpg",
    name: "Police Badge"
  },
  {
    badgeId: 2,
    imageUrl: "https://img.freepik.com/premium-vector/user-profile-success-privacy-protection-authentication-shield_903752-2143.jpg",
    name: "Agent Badge"
  },
  {
    badgeId: 3,
    imageUrl: "https://cdn.shopify.com/app-store/listing_images/1519e40cdca3ad377800c44f31ddb7ae/icon/CMTQ-4Wal_4CEAE=.png",
    name: "Top Trust Badge"
  },
]

const initialPointsAndLevelData = {
  data: "109",
  tier: "2"
}

const initialProfileData = {
  name: "Jon Doe",
  imageUrl: "https://buffer.com/library/content/images/2020/05/Ash-Read.png"
}
const Profile = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [pointsAndLevel, setPointsAndLevel] = useState(initialPointsAndLevelData);
  const [rank, setRank] = useState("123");
  const [badges, setBadges] = useState(initialBadgeData);

  const apiCredentials = {
    url: "https://staging.questprotocol.xyz",
    userId: "u-a2399489-9cd0-4c94-ad12-568379202b08",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWEyMzk5NDg5LTljZDAtNGM5NC1hZDEyLTU2ODM3OTIwMmIwOCIsImlhdCI6MTcwNzk4NzYyOSwiZXhwIjoxNzA4NTkyNDI5fQ.fESDqKunAqLUgHBCUsNYpGcNrTeVEty91HqGebX59Uc",
    apiKey: "k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be",
    entityId: "e-0000000000",
    secretKey: "profile-data-quest-labs",
  };
  const headers = {
    apikey: apiCredentials.apiKey,
    apisecret: apiCredentials.secretKey,
    userid: apiCredentials.userId,
    token: apiCredentials.token,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${apiCredentials.url}/api/users/${apiCredentials.userId}`,
          {
            headers,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfileData(data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchPointsAndLevel = async () => {
      try {
        const response = await fetch(
          `${apiCredentials.url}/api/entities/${apiCredentials.entityId}/users/${apiCredentials.userId}/xp`,
          {
            headers,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch points and level data");
        }
        const data = await response.json();
        setPointsAndLevel(data);
      } catch (error) {
        console.error("Error fetching points and level data:", error);
      }
    };

    const fetchRank = async () => {
      try {
        const response = await fetch(
          `${apiCredentials.url}/api/entities/${apiCredentials.entityId}/users/${apiCredentials.userId}/xp-leaderboard-rank`,
          {
            headers,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch points and level data");
        }
        const data = await response.json();
        setRank(data.data.position);
      } catch (error) {
        console.error("Error fetching points and level data:", error);
      }
    };

    const fetchBadges = async () => {
      try {
        const response = await fetch(
          `${apiCredentials.url}/api/entities/${apiCredentials.entityId}/users/${apiCredentials.userId}/badges`,
          {
            headers,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch points and level data");
        }
        const data = await response.json();
        setBadges(data.data);
      } catch (error) {
        console.error("Error fetching points and level data:", error);
      }
    };

    fetchProfileData();
    fetchPointsAndLevel();
    fetchRank();
    fetchBadges();
  }, []);
  //   console.log('Rank data', rank)
  return (
    <div className="profilePage">
      <div>
        <div>
            <FaChevronLeft />
        </div>
        <h1>Profile</h1>
      </div>
      <div>
        <div className="userAvatarBox">
          <img src={profileData?.imageUrl} alt={profileData?.name} />
        </div>
        <h2>{profileData?.name}</h2>
        <div className="userAchievementContainer">
          <AchivementBox value={pointsAndLevel.data} title={"Points"} />
          <AchivementBox value={`#${rank}`} title={"Ranks"} />
          <AchivementBox value={pointsAndLevel.tier} title={"Level"} />
        </div>
        <div className="tabContainer">
          <div className="tabButtons">
            <button>Membership</button>
            <button className="activeTab">Badges</button>
            <button>Point History</button>
          </div>
          <div className="tabContent">
            <BadgesTab badges={badges} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
