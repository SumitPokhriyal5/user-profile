import { useEffect, useState } from "react";

const BadgesTab = ({apiCredentials, headers}) => {
    const [badges, setBadges] = useState({})

    useEffect(() => {

        const fetchPointsAndLevel = async () => {
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

        fetchPointsAndLevel()
      }, [])
      console.log("badges:", badges)
  return (
    <div>BadgesTab</div>
  )
}

export default BadgesTab