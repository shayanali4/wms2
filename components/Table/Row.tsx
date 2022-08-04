const Row: React.FunctionComponent = ({ input }: any) => {
  return (
    <td className="py-3 px-6 text-center">
      <div className="flex align-center items-center">
        {/* <span className="text-center">{input}</span> */}
      </div>
    </td>
  );
  {
    console.log(input);
  }
};

export { Row };
