import { Layout } from 'antd';
import Image from 'next/image';

const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <AntHeader
      style={{
        background: '#fff',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Image src="/boxful-logo.svg" alt="Boxful" width={100} height={30} />
    </AntHeader>
  );
}
