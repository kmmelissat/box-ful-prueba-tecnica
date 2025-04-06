import { Form, Input, Button, DatePicker, Row, Col, Select } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import PageLayout from '@/components/PageLayout';
import FormContainer from '@/components/FormContainer';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

const { Option } = Select;

const departamentos: Record<string, string[]> = {
  'San Salvador': ['San Salvador', 'Soyapango', 'Mejicanos', 'Apopa'],
  'La Libertad': ['Santa Tecla', 'Antiguo Cuscatlán', 'Zaragoza', 'Nuevo Cuscatlán'],
};

export default function FormPage() {
  const [form] = Form.useForm();
  const [selectedDepto, setSelectedDepto] = useState<string>();
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log('Datos paso 1:', values);
    router.push('/form2');
  };

  return (
    <PageLayout>
      <FormContainer>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ fechaProgramada: dayjs(), pais: '+503' }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Dirección de recolección"
                name="direccionRecoleccion"
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <Input
                  prefix={<EnvironmentOutlined />}
                  placeholder="Colonia Las Magnolias..."
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Fecha Programada"
                name="fechaProgramada"
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format="DD / MM / YYYY"
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Nombres"
                name="nombres"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Apellidos"
                name="apellidos"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Correo Electrónico"
                name="correo"
                rules={[
                  { required: true },
                  { type: 'email', message: 'Correo inválido' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Teléfono"
                name="telefono"
                rules={[{ required: true }]}
              >
                <Input
                  addonBefore={
                    <Select defaultValue="+503" style={{ width: 90 }}>
                      <Option value="+503">🇸🇻 +503</Option>
                      <Option value="+502">🇬🇹 +502</Option>
                    </Select>
                  }
                  type="tel"
                  placeholder="6962 8383"
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                label="Dirección del destinatario"
                name="direccionDestino"
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<EnvironmentOutlined />}
                  placeholder="Ej: Final Av. Sur y Blvd. Los Próceres..."
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Departamento"
                name="departamento"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Selecciona un departamento"
                  onChange={(value) => {
                    setSelectedDepto(value);
                    form.setFieldsValue({ municipio: undefined });
                  }}
                >
                  {Object.keys(departamentos).map((depto) => (
                    <Option key={depto} value={depto}>
                      {depto}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Municipio"
                name="municipio"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Selecciona un municipio"
                  disabled={!selectedDepto}
                >
                  {(departamentos[selectedDepto || ''] || []).map((municipio) => (
                    <Option key={municipio} value={municipio}>
                      {municipio}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Punto de Referencia"
                name="referencia"
                rules={[{ required: true }]}
              >
                <Input placeholder="Cerca de redondel Árbol de la Paz" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Indicaciones" name="indicaciones">
                <Input.TextArea placeholder="Ej: Llamar antes de entregar." />
              </Form.Item>
            </Col>

            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" size="large">
                Siguiente →
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </PageLayout>
  );
}
