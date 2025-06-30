'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Términos y Condiciones</h1>
          <p className="text-gray-600 mt-2">Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Aceptación de los Términos</h2>
            <p className="text-gray-700 leading-relaxed">
              Al acceder y utilizar InmobiliariaApp, usted acepta estar sujeto a estos Términos y Condiciones de uso. 
              Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Descripción del Servicio</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              InmobiliariaApp es una plataforma de listado de propiedades inmobiliarias que permite a los usuarios:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Publicar propiedades en venta o alquiler</li>
              <li>Buscar y visualizar propiedades disponibles</li>
              <li>Contactar a anunciantes a través de formularios de contacto</li>
              <li>Guardar propiedades favoritas (usuarios registrados)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              InmobiliariaApp actúa únicamente como intermediario y no participa en las transacciones entre anunciantes e interesados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Uso de la Plataforma</h2>
            <h3 className="font-medium text-gray-800 mb-2">3.1 Registro de Usuario</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              El registro es opcional para navegar, pero obligatorio para publicar propiedades o guardar favoritos. 
              Los usuarios pueden registrarse mediante Google OAuth, garantizando así la seguridad de sus datos.
            </p>
            
            <h3 className="font-medium text-gray-800 mb-2">3.2 Publicación de Propiedades</h3>
            <p className="text-gray-700 leading-relaxed">
              Los usuarios que publiquen propiedades deben:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Proporcionar información veraz y actualizada</li>
              <li>Tener derecho legal para ofrecer la propiedad</li>
              <li>No publicar contenido fraudulento o engañoso</li>
              <li>Mantener actualizados los estados de disponibilidad</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Privacidad y Protección de Datos</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              En InmobiliariaApp nos tomamos muy en serio la privacidad de nuestros usuarios:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>No almacenamos datos personales sin consentimiento explícito</li>
              <li>Los datos de autenticación son manejados de forma segura mediante Google OAuth</li>
              <li>No compartimos información personal con terceros sin autorización</li>
              <li>Los usuarios pueden solicitar la eliminación de sus datos en cualquier momento</li>
              <li>No utilizamos cookies de seguimiento ni publicidad</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Para más detalles, consulte nuestra <Link href="/privacidad" className="text-orange-500 hover:text-orange-600">Política de Privacidad</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Procesamiento de Pagos</h2>
            <p className="text-gray-700 leading-relaxed">
              InmobiliariaApp NO procesa pagos ni transacciones financieras. Todas las negociaciones y transacciones 
              económicas se realizan directamente entre las partes interesadas fuera de nuestra plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contenido de Usuario</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Al publicar contenido en InmobiliariaApp, usted:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Mantiene todos los derechos sobre su contenido</li>
              <li>Nos otorga una licencia no exclusiva para mostrar dicho contenido en la plataforma</li>
              <li>Garantiza que tiene los derechos necesarios sobre las imágenes y textos publicados</li>
              <li>Se compromete a no publicar contenido que infrinja derechos de terceros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitación de Responsabilidad</h2>
            <p className="text-gray-700 leading-relaxed">
              InmobiliariaApp no se hace responsable de:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>La veracidad de la información publicada por los usuarios</li>
              <li>Las transacciones realizadas entre usuarios</li>
              <li>Pérdidas o daños derivados del uso de la plataforma</li>
              <li>Disputas entre compradores y vendedores o inquilinos y propietarios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Propiedad Intelectual</h2>
            <p className="text-gray-700 leading-relaxed">
              Todos los derechos de propiedad intelectual sobre el diseño, funcionalidad y contenido propio 
              de InmobiliariaApp pertenecen a sus respectivos propietarios. El uso no autorizado de estos 
              elementos está prohibido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Modificaciones de los Términos</h2>
            <p className="text-gray-700 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán 
              efectivos inmediatamente después de su publicación. El uso continuado del servicio después de 
              los cambios constituye la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Terminación</h2>
            <p className="text-gray-700 leading-relaxed">
              Nos reservamos el derecho de suspender o terminar el acceso de cualquier usuario que viole 
              estos términos y condiciones, sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Ley Aplicable</h2>
            <p className="text-gray-700 leading-relaxed">
              Estos términos se regirán e interpretarán de acuerdo con las leyes de la República Argentina. 
              Cualquier disputa será sometida a la jurisdicción de los tribunales competentes de la Ciudad 
              Autónoma de Buenos Aires.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Para cualquier consulta sobre estos términos y condiciones, puede contactarnos a través del 
              formulario de contacto disponible en nuestro sitio web.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Al utilizar InmobiliariaApp, usted reconoce haber leído, comprendido y aceptado estos Términos y Condiciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}