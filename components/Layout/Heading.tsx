import * as React from 'react';
import Image from 'next/image';
import logoOrange from '../../public/logoOrange.png';

type Props = {
  text?: string;
};

const Heading: React.FunctionComponent<Props> = ({
  text = 'This is the default Heading',
}) => (
  <div style={{ width: '5%', height: '5%', position: 'relative' }}>
    <Image
      alt="TuPack Logo"
      src={logoOrange}
      layout="responsive"
      objectFit="contain"
      width="10%"
      height="10%"
    />
    <h1 className="text-black text-center text-xl p-0 m-0">{text}</h1>
  </div>
);

export default Heading;
