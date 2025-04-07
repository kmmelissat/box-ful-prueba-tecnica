import {
  Form,
  Input,
  Button,
  Row,
  Col,
  InputNumber,
  Typography,
  Space,
  Divider,
  message,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PageLayout from '@/components/PageLayout';
import FormContainer from '@/components/FormContainer';
import { useFormStore } from '@/store/useFormStore';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

const { Title } = Typography;

interface Paquete {
  largo: number;
  alto: number;
  ancho: number;
  peso: number;
  contenido: string;
}

export default function FormStep2() {

  const { isLoggedIn } = useAuthStore();
const router = useRouter();

useEffect(() => {
  if (!isLoggedIn) {
    router.push('/login');
  }
}, [isLoggedIn]);

if (!isLoggedIn) return null;


  const [form] = Form.useForm();
  const [paquetes, setPaquetes] = useState<Paquete[]>([]);
  const { data, setFormData } = useFormStore();

  const agregarPaquete = (values: Paquete) => {
    setPaquetes([...paquetes, values]);
    form.resetFields();
  };

  const eliminarPaquete = (index: number) => {
    const copia = [...paquetes];
    copia.splice(index, 1);
    setPaquetes(copia);
  };

  const handleChange = (
    index: number,
    field: keyof Paquete,
    value: string | number | null
  ) => {
    const nuevos = [...paquetes];
    if (value !== null) {
      nuevos[index][field] = value as never;
      setPaquetes(nuevos);
    }
  };

  const handleSubmit = async () => {
    if (paquetes.length === 0) {
      message.warning('Agrega al menos un paquete');
      return;
    }
  
    setFormData({ paquetes });

    let telefono = data.telefono;

    if (!telefono?.startsWith('+503')) {
      telefono = '+503' + telefono;
    }
    
  
    const payload = {
      pickupAddress: data.direccionRecoleccion,
      scheduledDate: dayjs(data.fechaProgramada).toISOString(),
      firstName: data.nombres,
      lastName: data.apellidos,
      email: data.correo,
      phone: telefono,
      deliveryAddress: data.direccionDestino,
      department: data.departamento,
      municipality: data.municipio,
      referencePoint: data.referencia,
      instructions: data.indicaciones || '',
      packages: paquetes.map((p) => ({
        content: p.contenido,
        weight: p.peso,
        length: p.largo,
        height: p.alto,
        width: p.ancho,
      })),
    };
    
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3010/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
         },
        body: JSON.stringify(payload),
      });
    
      const resData = await response.json(); 
      if (!response.ok) throw new Error(resData.message || 'Error desconocido');
    
      message.success('✅ Tu orden fue enviada con éxito 🚚');
    } catch (err) {
      console.error(err);
      message.error(`❌ ${err.message}`);
    }
  };
  

  return (
    <PageLayout>
      <FormContainer>
        <Title level={4} style={{ marginBottom: 16 }}>
          Agrega tus bultos
        </Title>

        <Form form={form} layout="vertical" onFinish={agregarPaquete}>
          <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 12, marginBottom: 32 }}>
            <Row gutter={16} align="middle">
              <Col>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src="/box-icon.svg"
                    alt="Caja"
                    width={24}
                    height={24}
                    style={{ filter: 'grayscale(100%) opacity(0.6)' }}
                  />
                </div>
              </Col>

              <Col flex="auto">
                <div style={{ display: 'flex', gap: 8 }}>
                  <Form.Item
                    name="largo"
                    label={<span style={{ color: '#697586' }}>Largo</span>}
                    rules={[{ required: true, message: 'Ingresa el largo' }]}
                  >
                    <InputNumber addonAfter="cm" style={{ width: 120 }} />
                  </Form.Item>
                  <Form.Item
                    name="alto"
                    label={<span style={{ color: '#697586' }}>Alto</span>}
                    rules={[{ required: true, message: 'Ingresa el alto' }]}
                  >
                    <InputNumber addonAfter="cm" style={{ width: 120 }} />
                  </Form.Item>
                  <Form.Item
                    name="ancho"
                    label={<span style={{ color: '#697586' }}>Ancho</span>}
                    rules={[{ required: true, message: 'Ingresa el ancho' }]}
                  >
                    <InputNumber addonAfter="cm" style={{ width: 120 }} />
                  </Form.Item>
                </div>
              </Col>

              <Col span={4}>
                <Form.Item
                  name="peso"
                  label={<span style={{ color: '#697586' }}>Peso en libras</span>}
                  rules={[{ required: true }]}
                >
                  <InputNumber addonAfter="lb" style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="contenido"
                  label={<span style={{ color: '#697586' }}>Contenido</span>}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Ej: iPhone 14 Pro Max" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ textAlign: 'right', marginTop: 16 }}>
              <Button icon={<PlusOutlined />} htmlType="submit">
                Agregar
              </Button>
            </Form.Item>
          </div>
        </Form>

        <Divider />

        <Title level={5} style={{ marginBottom: 16 }}>
          Bultos agregados
        </Title>

        <Space direction="vertical" style={{ width: '100%' }}>
          {paquetes.map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #6DD28E',
                borderRadius: 12,
                padding: 24,
                backgroundColor: '#ffffff',
              }}
            >
              <Row gutter={16} align="middle">
                <Col span={4}>
                  <div style={{ marginBottom: 4, color: '#697586' }}>Peso en libras</div>
                  <InputNumber
                    value={item.peso}
                    onChange={(value) => handleChange(index, 'peso', value)}
                    addonAfter="lb"
                    style={{
                      width: '100%',

                    }}
                  />
                </Col>

                <Col span={10}>
                  <div style={{ marginBottom: 4, color: '#697586' }}>Contenido</div>
                  <Input
                    value={item.contenido}
                    onChange={(e) => handleChange(index, 'contenido', e.target.value)}
                    style={{
                      width: '100%',
                      borderRadius: 8,
                    }}
                  />
                </Col>

                <Col span={1}>
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src="/box-icon.svg"
                      alt="Caja"
                      width={24}
                      height={24}
                    />
                  </div>
                </Col>

                <Col span={8}>
                  <Row gutter={8} align="bottom">
                    {['largo', 'alto', 'ancho'].map((dim, i) => (
                      <Col span={8} key={dim}>
                        <div style={{ marginBottom: 4, color: '#697586', fontWeight: 500 }}>
                          {dim.charAt(0).toUpperCase() + dim.slice(1)}
                        </div>
                        <InputNumber
                          value={item[dim as keyof Paquete] as number}
                          onChange={(value) => handleChange(index, dim as keyof Paquete, value)}
                          addonAfter="cm"
                          style={{
                            width: '100%',
                            borderRadius: 12,
                            backgroundColor: '#FAFAFA',
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>

                <Col span={1}>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined style={{ fontSize: 16 }} />}
                    onClick={() => eliminarPaquete(index)}
                    style={{ padding: 4 }}
                  />
                </Col>
              </Row>
            </div>
          ))}
        </Space>

        <Divider />

        <Row justify="space-between" style={{ marginTop: 32 }}>
          <Col>
            <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.back()}
            size="large"
            >
              Regresar
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={handleSubmit}
              size="large"
            >
              Enviar
            </Button>
          </Col>
        </Row>
      </FormContainer>
    </PageLayout>
  );
}
