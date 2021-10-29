import ImagesOfBuildings from "../ImagesOfBuildings";

const BuildingSquare = (props) => {
  const onSelectHandler = () => {
    props.onSelectHandler(props.id);
  };

  return (
    <div className="building-square">
      <div
        className={`building-square__inner ${
          props.selected ? "selected-field" : ""
        }`}
        onClick={onSelectHandler}
      >
        <ImagesOfBuildings
          buildingId={props.building}
          biggerImageSize={"2.2em"}
          smallerImageSize={"1.2em"}
        />
      </div>
    </div>
  );
};

export default BuildingSquare;
