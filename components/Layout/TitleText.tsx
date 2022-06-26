import * as React from 'react';

type Props = {
  text?: string;
};

const TitleText: React.FunctionComponent<Props> = ({
  text = 'Enter text',
}) => <h1 className="text-xl"> {text} </h1>;

export default TitleText;
