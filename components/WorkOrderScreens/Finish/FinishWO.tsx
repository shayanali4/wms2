export const FinishWO = () => {
  return (
    <>
      <label htmlFor="finalComments">
        <h2>Add Comments</h2>
      </label>
      <strong>
        You must contact the customer to make sure they are aware of
        any changes.
      </strong>
      <textarea
        id="finalComments"
        placeholder="Enter final notes to share with the customer here"
      ></textarea>
      <label htmlFor="QCPics">
        <h2>Add Supporting Pictures</h2>
      </label>
      <input id="QCPics" type="file" multiple accept="image/*" />
    </>
  );
};
