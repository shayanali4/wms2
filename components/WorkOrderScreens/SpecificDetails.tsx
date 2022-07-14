export const SpecificDetails = (props: any) => {
  const specificsAsArray = Object.entries(props.specifics);
  const filterNulls = specificsAsArray.filter(
    ([key, value]) => value != null
  );
  const specifics = filterNulls.filter(
    ([key, value]) => key != 'order_id'
  );
  const skus = props.workOrder.skus;

  return (
    <>
      <h2>Specific Order Details</h2>
      <ul>
        <li> --- </li>

        {specifics.map((specific) => (
          <li key={specific[0]}>
            {specific[0]}: {specific[1]}
          </li>
        ))}
      </ul>
      {!skus ? null : skus.length === 1 ? (
        <h3>SKU</h3>
      ) : (
        <h2>SKUs</h2>
      )}
      <ul className="mb-3">
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
