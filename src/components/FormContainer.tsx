// components/FormContainer.tsx
import { Typography } from 'antd';
import { ReactNode } from 'react';

const { Title, Text } = Typography;

interface FormContainerProps {
  children: ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Title level={3}>Crea una orden</Title>
      <Text type="secondary">
        Dale una ventaja competitiva a tu negocio con entregas el{' '}
        <strong>mismo día</strong> (Área Metropolitana) y el{' '}
        <strong>día siguiente</strong> a nivel nacional.
      </Text>

      <div
        style={{
          background: '#fff',
          padding: 32,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginTop: 32,
        }}
      >
        {children}
      </div>
    </div>
  );
}
