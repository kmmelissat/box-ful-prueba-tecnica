import { Form, Input, Button, Select, DatePicker, Typography, message } from 'antd';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';

const { Title } = Typography;
const { Option } = Select;

export default function RegisterPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      return message.warning('⚠️ Las contraseñas no coinciden');
    }

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      birthDate: values.birthDate.format('YYYY-MM-DD'),
      email: values.email,
      phone: '+503' + values.phone,
      password: values.password,
    };

    try {
      setLoading(true);
      const res = await fetch('http://localhost:3010/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Registro fallido');

      message.success('✅ Usuario registrado con éxito');
      router.push('/login');
    } catch (err) {
      message.error('❌ Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Izquierda: Formulario */}
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
        <div style={{ maxWidth: 480, marginTop: 32 }}>
          <Title level={4}>🧡 Cuéntanos de ti</Title>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div style={{ display: 'flex', gap: 12 }}>
              <Form.Item
                name="firstName"
                label="Nombre"
                rules={[{ required: true }]}
                style={{ flex: 1 }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Apellido"
                rules={[{ required: true }]}
                style={{ flex: 1 }}
              >
                <Input />
              </Form.Item>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Form.Item
                name="gender"
                label="Género"
                rules={[{ required: true }]}
                style={{ flex: 1 }}
              >
                <Select placeholder="Selecciona">
                  <Option value="Femenino">Femenino</Option>
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Otro">Otro</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="birthDate"
                label="Fecha de nacimiento"
                rules={[{ required: true }]}
                style={{ flex: 1 }}
              >
                <DatePicker style={{ width: '100%' }} format="DD / MM / YYYY" />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Correo Electrónico"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Número de Whatsapp"
              rules={[{ required: true, pattern: /^[267]{1}[0-9]{7}$/, message: 'Ej: 71234567' }]}
            >
              <Input addonBefore="+503" type="tel" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Contraseña"
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Repite tu contraseña"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
              >
                Siguiente
              </Button>
            </Form.Item>
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
          alt="Registro visual"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
}
