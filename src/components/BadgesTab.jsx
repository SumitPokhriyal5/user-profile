import Badge from "./Badge";

const BadgesTab = ({badges}) => {
    
    //   console.log("badges:", badges)
  return (
    <div className="badgesContainer">
        {badges && badges?.map((badge) => (
            <Badge key={badge.badgeId} image={badge.imageUrl} name={badge.name}  />
        ))}
    </div>
  )
}

export default BadgesTab