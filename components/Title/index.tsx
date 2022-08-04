type Props = { text: string; color?: string };

const Title: React.FunctionComponent<Props> = ({
  color = 'black',
  text,
}) => {
  return (
    <>
      <h1
        className={`font-medium leading-tight text-5xl mt-0 mb-2 ${color}`}
      >
        {text}
      </h1>
    </>
  );
};

export default Title;
