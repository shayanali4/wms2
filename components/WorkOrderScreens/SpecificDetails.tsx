export const SpecificDetails = (props: any) => {
  const specificsAsArray = Object.entries(props.specifics);
  const filterNulls = specificsAsArray.filter(
    ([key, value]) => value != null
  );
  const specifics = filterNulls.filter(
    ([key, value]) => key != 'order_id'
  );
  console.log(props.workOrder);
  const skus = props.workOrder.skus;

  return (
    <>
      <h1>Specific Order Details</h1>
      <ul>
        {specifics.map((specific) => (
          <li>
            {specific[0]}: {specific[1]}
          </li>
        ))}
      </ul>
      {!skus ? null : skus.length === 1 ? (
        <h1>SKU</h1>
      ) : (
        <h1>SKUs</h1>
      )}
      <ul>
        {skus
          ? skus.map((sku: any, i: number) => {
              return (
                <li key={i}>
                  {i + 1} {sku}
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
};
