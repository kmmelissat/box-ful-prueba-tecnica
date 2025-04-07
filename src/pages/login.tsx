import { Form, Input, Button, Typography, message } from 'antd';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const { setToken, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/form');
    }
  }, [isLoggedIn]);

  const onFinish = async (values: any) => {
    try {
      const res = await fetch('http://localhost:3010/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Credenciales inválidas');

      const data = await res.json();
      setToken(data.access_token); // 👉 aquí guardás sesión en Zustand

      message.success('✅ Sesión iniciada');
      router.push('/form');
    } catch (err) {
      message.error('❌ Credenciales inválidas');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Izquierda */}
      <div
        style={{
          flex: 1,
          padding: '64px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Image src="/boxful-logo.svg" alt="Logo Boxful" width={100} height={40} />
        <div style={{ maxWidth: 400, marginTop: 48 }}>
          <Title level={3} style={{ fontWeight: 700 }}>
            Bienvenido
          </Title>
          <p style={{ color: '#667085', fontFamily: 'Inter, sans-serif' }}>
            Por favor ingresa tus credenciales
          </p>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Correo Electrónico"
              name="email"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>

            <div style={{ textAlign: 'right', marginBottom: 16 }}>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Iniciar Sesión
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              ¿Necesitas una cuenta?{' '}
              <a onClick={() => router.push('/register')} style={{ fontWeight: 500 }}>
                Regístrate aquí
              </a>
            </div>
          </Form>
        </div>
      </div>

      {/* Derecha: Imagen */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          height: '100vh',
        }}
      >
        <Image
          src="/login-image.png"
          alt="Login visual"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
}
