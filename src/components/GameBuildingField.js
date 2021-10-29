import BuildingsField from "./BuildingsArea/BuildingsField";

const GameBuildingField = (props) => {

  const onSelectHandler = (field) => {
    props.onClickEventHandler(field);
  }

  return (
    <>
      <BuildingsField
        fields={props.buildingAreas}
        onSelectHandler={onSelectHandler}
      />
    </>
  );
};

export default GameBuildingField;
