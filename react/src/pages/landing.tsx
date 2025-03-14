import { IconTarget, IconMap } from '@tabler/icons-react';
import { Carousel } from "flowbite-react";
import Template from "@/layout";

export default function LandingPage() {
  return (
    <Template 
      title="Inicio"
      before={(
        <div className="flex flex-col justify-center items-center w-full select-none">
          <h3 className="text-white text-5xl font-extrabold bg-primary-500 w-full pt-10 pb-20 text-center">La Flamita</h3>
          <img src="/images/waves.svg" className="w-full select-none" />
        </div>
      )}
    >
      <h2 className="font-bold text-2xl mt-8 mb-5 pb-2 border-b-2 border-quinary-700">
        Sobre nosotros
      </h2>

      <div className="mb-12">
        <p className="text-lg italic text-center">
          Somos una taqueria tradicional mexicana fundada en 1990 por el
          <span className="font-bold"> Ing. Jose Alberto Jimenez Noroña </span>
          como parte de su vision por compartir la cocina tradicional mexicana.
        </p>
      </div>

      <section className="mb-8 flex gap-6 items-center">
        <span className='bg-primary-600 p-2 rounded-full'>
          <IconMap className='text-white' size={45} />
        </span>
        <article>
          <h3 className="font-bold text-xl">Nuestra mision</h3>
          <p className="text-lg flex flex-col">
            Somos una empresa comprometida en utilizar ingredientes de alta
            calidad produciendo unos de los mejopres tacos de la ciudad.
          </p>
        </article>
      </section>

      <div className="mb-5 flex gap-6 items-center">
        <span className='bg-primary-600 p-2 rounded-full'>
          <IconTarget className='text-white' size={45} />
        </span>
        <article>
          <h3 className="font-bold text-xl">Visión</h3>
          <p className="text-lg">
            Buscamos ser parte de las empresas gatronomicas lideres del mercado
            mexicano.
          </p>
        </article>
      </div>

      <h2 className="font-bold text-2xl mt-8 mb-5 pb-2 border-b-2 border-quinary-700">
        Nuestras instalaciones
      </h2>

      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <img
            src="/images/carrusel/1.jpg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
          <img
            src="/images/carrusel/2.jpg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
          <img
            src="/images/carrusel/3.jpg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
          <img
            src="/images/carrusel/4.jpg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
          <img
            src="/images/carrusel/5.jpg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </Carousel>
      </div>

      <h2 className="font-bold text-2xl mt-8 mb-5 pb-2 border-b-2 border-quinary-700">
        Nuestra ubicación
      </h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d933.0766692172259!2d-103.35342583045355!3d20.69776765335163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1da297f251d%3A0x942606954ffc753a!2sTaquer%C3%ADa%20La%20Flamita!5e0!3m2!1ses!2smx!4v1731893295444!5m2!1ses!2smx"
        width="100%"
        height="500px"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg border shadow"
        allowFullScreen
      ></iframe>
    </Template>
  );
}
