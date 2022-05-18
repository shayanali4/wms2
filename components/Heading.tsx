import * as React from 'react';
import Image from 'next/Image';
import logoOrange from '../public/logoOrange.png';

type Props = {
  text?: string;
};

const Heading: React.FunctionComponent<Props> = ({
  text = 'This is the default Heading',
}) => (
  <div className="w-4/5">
    <Image src={logoOrange} layout="responsive" alt="pic" />
    <h1 className="text-black text-center text-2xl">{text}</h1>
  </div>
);

export default Heading;
