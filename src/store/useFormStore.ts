// store/useFormStore.ts
import { create } from 'zustand';

interface Paquete {
  largo: number;
  alto: number;
  ancho: number;
  peso: number;
  contenido: string;
}

interface FormData {
  direccionRecoleccion: string;
  fechaProgramada: string;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  direccionDestino: string;
  departamento: string;
  municipio: string;
  referencia: string;
  indicaciones?: string;
  paquetes: Paquete[];
}

interface FormStore {
  data: Partial<FormData>;
  setFormData: (values: Partial<FormData>) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  data: {},
  setFormData: (values) =>
    set((state) => ({ data: { ...state.data, ...values } })),
  resetForm: () => set({ data: {} }),
}));
