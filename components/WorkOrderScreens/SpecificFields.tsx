interface FieldsObject {
  contents: unknown;
}

export function SpecificFields(fieldsObject: FieldsObject) {
  let fieldsArray = Object.keys(fieldsObject.contents)
    .map((k) => [[k, fieldsObject.contents[k]]])
    .filter((el) => el[0][1] != null && el[0][0] != 'order_id');
  return fieldsArray ? (
    <div>
      {console.log(fieldsArray)}
      <ul></ul>
      {fieldsArray.map((field: any, i: number) => {
        return (
          <li key={i}>
            {field[0]}: {field[1]}
          </li>
        );
      })}{' '}
    </div>
  ) : null;
}
