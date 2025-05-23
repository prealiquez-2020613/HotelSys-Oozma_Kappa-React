import React, { useEffect, useState } from 'react';
import { useAddHotel } from '../shared/hooks/Hotel/useAddHotel';
import { useGetHotels } from '../shared/hooks/Hotel/useGetHotels';
import { useUpdateHotel } from '../shared/hooks/Hotel/useUpdateHotel';
import { useDeleteHotel } from '../shared/hooks/Hotel/useDeleteHotel';
import toast from 'react-hot-toast';

export const HotelForm = () => {
  // Hooks para llamadas al backend
  const { getHotels, hotels, setHotels } = useGetHotels();
  const { setHotel } = useAddHotel();
  const { updateHotel } = useUpdateHotel();
  const { deleteHotelHook } = useDeleteHotel();

  // Estados locales
  const [form, setForm] = useState({ name: '', address: '', category: '', amenities: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validaciones de errores individuales
  const [errors, setErrors] = useState({});

  // Cargar hoteles en el montaje
  useEffect(() => {
    getHotels();
  }, []);

  // Manejo de cambios en inputs
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' })); // limpiar error al modificar campo
  };

  // Validación de formulario mostrando errores inline
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.address.trim()) newErrors.address = 'La dirección es obligatoria';
    if (!form.category.trim()) newErrors.category = 'La categoría es obligatoria';
    if (!form.amenities.trim()) newErrors.amenities = 'Los servicios son obligatorios';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Crear o actualizar hotel
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const payload = {
      ...form,
      amenities: form.amenities.split(',').map(a => a.trim()).filter(a => a),
    };

    try {
      if (editingId) {
        // Actualizar hotel
        const res = await updateHotel(editingId, payload);
        if (!res.error) {
          await getHotels(); // refresca lista completa
          resetForm();
          toast.success('Hotel actualizado!');
        } else {
          toast.error('Error al actualizar hotel');
        }
      } else {
        // Crear hotel
        const res = await setHotel(payload);
        if (!res.error) {
          await getHotels();
          resetForm();
          // Toast success lo maneja el hook
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión o inesperado');
    } finally {
      setLoading(false);
    }
  };

  // Establecer datos para editar
  const handleEdit = (hotel) => {
    setForm({
      name: hotel.name || '',
      address: hotel.address || '',
      category: hotel.category || '',
      amenities: Array.isArray(hotel.amenities) ? hotel.amenities.join(', ') : '',
    });
    setEditingId(hotel._id);
    setErrors({});
  };

  // Eliminar hotel
  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este hotel?');
    if (!confirm) return;

    try {
      const res = await deleteHotelHook(id);
      if (!res.error) {
        await getHotels();
        if (id === editingId) resetForm(); // Cancelar edición si se elimina
      } else {
        console.error('Error al eliminar:', res);
      }
    } catch (err) {
      console.error('Error al eliminar hotel:', err);
    }
  };

  // Reiniciar formulario
  const resetForm = () => {
    setForm({ name: '', address: '', category: '', amenities: '' });
    setEditingId(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-blue-100 p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-teal-700 mb-6 border-b-4 border-teal-300 pb-2 select-none">
          Gestión de Hoteles
        </h1>

        {/* Formulario */}
        <section aria-label={editingId ? "Formulario para editar hotel" : "Formulario para agregar hotel"} className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-5">{editingId ? 'Editar Hotel' : 'Agregar Nuevo Hotel'}</h2>
          <form
            onSubmit={e => { e.preventDefault(); handleSubmit(); }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            noValidate
          >
            {/* Campo Nombre */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                id="name"
                autoComplete="off"
                className={`peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-teal-500 transition ${
                  errors.name ? 'border-red-500 focus:border-red-600' : ''
                }`}
                placeholder="Nombre del hotel"
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-5 text-teal-600 text-sm font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm select-none transition-all"
              >
                Nombre del hotel
              </label>
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Campo Dirección */}
            <div className="relative">
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                id="address"
                autoComplete="off"
                className={`peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-teal-500 transition ${
                  errors.address ? 'border-red-500 focus:border-red-600' : ''
                }`}
                placeholder="Dirección"
              />
              <label
                htmlFor="address"
                className="absolute left-0 -top-5 text-teal-600 text-sm font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm select-none transition-all"
              >
                Dirección
              </label>
              {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
            </div>

            {/* Campo Categoría */}
            <div className="relative">
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                id="category"
                autoComplete="off"
                className={`peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-teal-500 transition ${
                  errors.category ? 'border-red-500 focus:border-red-600' : ''
                }`}
                placeholder="Categoría"
              />
              <label
                htmlFor="category"
                className="absolute left-0 -top-5 text-teal-600 text-sm font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm select-none transition-all"
              >
                Categoría
              </label>
              {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
            </div>

            {/* Campo Servicios */}
            <div className="relative">
              <input
                type="text"
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                id="amenities"
                autoComplete="off"
                className={`peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-teal-500 transition ${
                  errors.amenities ? 'border-red-500 focus:border-red-600' : ''
                }`}
                placeholder="Servicios (separados por coma)"
              />
              <label
                htmlFor="amenities"
                className="absolute left-0 -top-5 text-teal-600 text-sm font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm select-none transition-all"
              >
                Servicios (separados por coma)
              </label>
              {errors.amenities && <p className="text-sm text-red-600 mt-1">{errors.amenities}</p>}
            </div>

            {/* Botones */}
            <div className="md:col-span-2 flex gap-6 justify-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-full font-semibold text-white shadow-lg transition-transform transform ${
                  editingId
                    ? 'bg-yellow-500 hover:bg-yellow-600 active:scale-95'
                    : 'bg-green-500 hover:bg-green-600 active:scale-95'
                } focus:outline-none focus:ring-4 focus:ring-teal-300`}
              >
                {loading ? 'Guardando...' : editingId ? 'Guardar Cambios' : 'Registrar Hotel'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                  Cancelar Edición
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Tabla de hoteles */}
        <section aria-label="Lista de hoteles registrados" className="overflow-x-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-5">Lista de Hoteles</h2>
          <table className="min-w-full rounded-xl overflow-hidden shadow-lg">
            <thead className="bg-gradient-to-r from-teal-300 to-blue-400 text-white">
              <tr>
                <th className="text-left px-6 py-3 font-semibold uppercase tracking-wider">Nombre</th>
                <th className="text-left px-6 py-3 font-semibold uppercase tracking-wider">Dirección</th>
                <th className="text-left px-6 py-3 font-semibold uppercase tracking-wider">Categoría</th>
                <th className="text-left px-6 py-3 font-semibold uppercase tracking-wider">Servicios</th>
                <th className="text-center px-6 py-3 font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hotels.length > 0 ? (
                hotels.map(hotel => (
                  <tr key={hotel._id} className="hover:bg-teal-50 group transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{hotel.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{hotel.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{hotel.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {Array.isArray(hotel.amenities) ? hotel.amenities.join(', ') : hotel.amenities}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                      <button
                        onClick={() => handleEdit(hotel)}
                        className="text-yellow-600 hover:text-yellow-800 font-semibold focus:outline-none focus:underline"
                        aria-label={`Editar hotel ${hotel.name}`}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(hotel._id)}
                        className="text-red-600 hover:text-red-800 font-semibold focus:outline-none focus:underline"
                        aria-label={`Eliminar hotel ${hotel.name}`}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 italic select-none">
                    No hay hoteles registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

