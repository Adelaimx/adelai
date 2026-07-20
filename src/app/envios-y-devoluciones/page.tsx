import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Envíos y Devoluciones | ADELAI',
  description: 'Conoce nuestras políticas de envíos y devoluciones en ADELAI Joyería.',
  alternates: {
    canonical: '/envios-y-devoluciones',
  },
};

export default function EnviosDevolucionesPage() {
  return (
    <div className="bg-background-light min-h-screen pt-32 pb-24 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 uppercase tracking-widest">
            Envíos y Devoluciones
          </h1>
          <div className="w-16 h-[1px] bg-primary/30 mx-auto"></div>
        </div>

        <div className="space-y-16">
          {/* Envíos Section */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 tracking-wide">
              Políticas de Envíos
            </h2>
            <div className="space-y-4 text-secondary font-light leading-relaxed">
              <p>
                <strong>Envíos en toda la república mexicana:</strong> Todos los pedidos se procesan en un plazo de 1-2 días hábiles después de la confirmación de pago.
              </p>
              <p>
                El tiempo estimado de entrega es de <strong>2 a 5 días hábiles</strong>, este tiempo puede variar durante periodos de alta demanda de la paquetería y presentar ligeras variaciones.
              </p>
              <p>
                El envío se realiza a través de paqueterías confiables con número de rastreo. Una vez enviado tu pedido recibirás un correo o mensaje con el número de rastreo para seguir tu paquete.
              </p>
              <p>
                ADELAI no se hace responsable por retrasos ocasionados por la paquetería, condiciones climáticas o eventos fuera de nuestro control.
              </p>
              <p className="font-medium text-primary">
                Es responsabilidad del cliente verificar que la dirección sea correcta antes de finalizar su compra.
              </p>
            </div>
          </section>

          {/* Devoluciones Section */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 tracking-wide">
              Políticas de Devoluciones
            </h2>
            <div className="space-y-4 text-secondary font-light leading-relaxed">
              <p>
                En ADELAI cuidamos cada pieza con dedicación. Si por alguna razón tu joyería llega rota, dañada o con defecto de fabricación aceptamos cambios dentro de los <strong>7 días naturales</strong> posteriores a la recepción de tu pedido.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 shadow-sm">
                <p className="font-bold text-primary mb-3 uppercase tracking-widest text-xs">
                  Para que un cambio sea válido, la pieza debe:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Estar sin uso.</li>
                  <li>Estar en perfectas condiciones.</li>
                  <li>Contar con su empaque original.</li>
                </ul>
              </div>

              <p>
                <strong>Importante:</strong> Por razones de higiene, los aretes <strong>no tienen devolución</strong>.
              </p>
              <p>
                Los gastos derivados de cambios corren por cuenta del cliente, salvo en casos de defecto de fabricación. Para solicitar un cambio por favor contáctanos a través de nuestro correo electrónico <a href="mailto:adelai.mx@gmail.com" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">adelai.mx@gmail.com</a> indicando tu número de pedido.
              </p>

              <h3 className="font-bold text-primary mt-8 mb-4 text-lg">
                Condiciones Generales
              </h3>
              <ul className="space-y-3 list-disc pl-5">
                <li>No se aceptan cambios o devoluciones por motivos de preferencia personal o por que el producto no haya sido del agrado del cliente.</li>
                <li>No se aceptan cambios o devoluciones en productos con descuento o en promociones especiales.</li>
                <li>ADELAI se reserva el derecho de rechazar solicitudes que no cumplen con nuestras políticas.</li>
              </ul>

              <p className="mt-6 p-4 bg-primary/5 rounded-lg border-l-2 border-primary text-sm italic">
                Los reembolsos se realizarán a través del mismo método de pago utilizado en la compra, una vez que el producto haya sido recibido y evaluado por nuestro equipo. Este se realizará en un plazo máximo de 72 horas posterior a su aprobación y dependiendo de la emisión bancaria podrá verse reflejado en un periodo de 7 a 15 días hábiles.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
