import {
    GiWoodCabin,
    GiWoodAxe,
    GiHut,
    GiVikingLonghouse,
    GiMining,
    GiMetalBar,
    GiEgyptianTemple,
    GiSwordman,
    GiBowman,
    GiPointySword,
    GiPocketBow,
    GiShoulderArmor,
    GiBarracksTent,
    GiMedievalPavilion,
    GiMedievalGate,
    GiTripleGate,
  } from "react-icons/gi";
const ImagesOfBuildings = (props) => {
    const imageSize = props.biggerImageSize;
    const secondImageSize = props.smallerImageSize;
    const biggerIconColor = "black";
  const getBuildingImage = (buildinId) => {
    switch (buildinId) {
      case 1:
        return <GiHut size={imageSize} color={biggerIconColor} />;
      case 2:
        return <GiVikingLonghouse size={imageSize} color={biggerIconColor} />;
      case 3:
        return (
          <span>
            <GiBarracksTent size={imageSize} color={biggerIconColor} />{" "}
            <GiSwordman size={secondImageSize} color={biggerIconColor} />
          </span>
        );
      case 4:
        return (
          <span>
            <GiMedievalPavilion size={imageSize} color={biggerIconColor} />{" "}
            <GiBowman size={secondImageSize} color={biggerIconColor} />
          </span>
        );
      case 5:
        return (
          <span>
            <GiWoodCabin size={imageSize} color="rgb(227, 0, 0)" />{" "}
            <GiWoodAxe size={secondImageSize} />
          </span>
        );
      case 6:
        return (
          <span>
            <GiWoodCabin size={imageSize} color="rgb(95, 102, 74)" />{" "}
            <GiMining size={secondImageSize} />
          </span>
        );
      case 7:
        return (
          <span>
            <GiWoodCabin size={imageSize} color="rgb(19, 84, 1)" />{" "}
            <GiMetalBar size={secondImageSize} />
          </span>
        );
      case 8:
        return (
          <span>
            <GiMedievalGate size={imageSize} color={biggerIconColor} />{" "}
            <GiShoulderArmor size={secondImageSize} />
          </span>
        );
      case 9:
        return (
          <span>
            <GiEgyptianTemple size={imageSize} color={biggerIconColor} />{" "}
            <GiPointySword size={secondImageSize} />
          </span>
        );
      case 10:
        return (
          <span>
            <GiTripleGate size={imageSize} color={biggerIconColor} />{" "}
            <GiPocketBow size={secondImageSize} />
          </span>
        );
      default:
        return (
          <span></span>
        )
    }
  };
  return <div>{getBuildingImage(props.buildingId)}</div>;
};

export default ImagesOfBuildings;
