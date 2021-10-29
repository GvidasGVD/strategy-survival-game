
import BuildingSquare from "./BuildingSquare";

const BuildingsField = (props) => {
  const onSelectHandler = (field) => {
    props.onSelectHandler(field)
  }

  return (
    <div className="buildings-field">
      {props.fields.map((field) => (
        <BuildingSquare
          key={field.id}
          id={field.id}
          value={field.value}
          building={field.building}
          selected={field.selected}
          onSelectHandler={onSelectHandler}
        />
      ))}
    </div>
  );
};

export default BuildingsField;
