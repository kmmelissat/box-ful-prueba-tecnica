
import { Layout } from 'antd';
import Header from './Header';
import { ReactNode } from 'react';

const { Content } = Layout;

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Header />
      <Content style={{ padding: '24px 16px' }}>{children}</Content>
    </Layout>
  );
}
