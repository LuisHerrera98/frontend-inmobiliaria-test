'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacidadPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Política de Privacidad</h1>
          <p className="text-gray-600 mt-2">Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introducción</h2>
            <p className="text-gray-700 leading-relaxed">
              En InmobiliariaApp respetamos su privacidad y nos comprometemos a proteger sus datos personales. 
              Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos su información cuando 
              utiliza nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Información que Recopilamos</h2>
            <h3 className="font-medium text-gray-800 mb-2">2.1 Información proporcionada directamente</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Nombre y apellido (al registrarse con Google)</li>
              <li>Dirección de correo electrónico</li>
              <li>Información de las propiedades que publica</li>
              <li>Mensajes enviados a través de formularios de contacto</li>
            </ul>

            <h3 className="font-medium text-gray-800 mb-2 mt-4">2.2 Información recopilada automáticamente</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Dirección IP</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Fecha y hora de acceso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Uso de la Información</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Proporcionar y mantener nuestros servicios</li>
              <li>Gestionar su cuenta de usuario</li>
              <li>Permitir la publicación y búsqueda de propiedades</li>
              <li>Facilitar la comunicación entre usuarios</li>
              <li>Mejorar la experiencia del usuario</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Almacenamiento de Datos</h2>
            <p className="text-gray-700 leading-relaxed">
              Sus datos se almacenan de forma segura en servidores protegidos. Implementamos medidas de seguridad 
              técnicas y organizativas para proteger su información contra acceso no autorizado, pérdida o alteración.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>Importante:</strong> No almacenamos contraseñas. La autenticación se realiza exclusivamente 
              a través de Google OAuth, lo que garantiza la máxima seguridad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Compartir Información</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NO vendemos, alquilamos ni compartimos su información personal con terceros, excepto en los siguientes casos:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Con su consentimiento explícito</li>
              <li>Para cumplir con obligaciones legales</li>
              <li>Para proteger nuestros derechos y seguridad</li>
              <li>Con proveedores de servicios que nos ayudan a operar la plataforma (bajo estrictos acuerdos de confidencialidad)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos cookies esenciales para el funcionamiento del sitio web:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Cookies de sesión para mantener su inicio de sesión</li>
              <li>Cookies de preferencias para recordar sus configuraciones</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              NO utilizamos cookies de seguimiento, publicidad o análisis de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Sus Derechos</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Acceder a sus datos personales</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Solicitar la portabilidad de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Para ejercer estos derechos, contáctenos a través del formulario de contacto del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Menores de Edad</h2>
            <p className="text-gray-700 leading-relaxed">
              InmobiliariaApp no está dirigido a menores de 18 años. No recopilamos intencionalmente información 
              de menores de edad. Si detectamos que hemos recopilado información de un menor, la eliminaremos 
              inmediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Seguridad de Datos</h2>
            <p className="text-gray-700 leading-relaxed">
              Implementamos medidas de seguridad apropiadas, incluyendo:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Cifrado SSL/TLS para todas las comunicaciones</li>
              <li>Autenticación segura mediante Google OAuth</li>
              <li>Acceso restringido a datos personales</li>
              <li>Monitoreo regular de seguridad</li>
              <li>Actualizaciones periódicas de seguridad</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Transferencia Internacional de Datos</h2>
            <p className="text-gray-700 leading-relaxed">
              Sus datos pueden ser transferidos y mantenidos en servidores ubicados fuera de Argentina. 
              Al utilizar nuestro servicio, usted consiente esta transferencia, que se realiza cumpliendo 
              con todas las normativas aplicables de protección de datos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Cambios en la Política de Privacidad</h2>
            <p className="text-gray-700 leading-relaxed">
              Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios 
              significativos publicando la nueva política en esta página y actualizando la fecha de "Última 
              actualización".
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos sus datos, 
              puede contactarnos a través del formulario de contacto disponible en nuestro sitio web.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Esta Política de Privacidad forma parte integral de nuestros <Link href="/terminos" className="text-orange-500 hover:text-orange-600">Términos y Condiciones</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}