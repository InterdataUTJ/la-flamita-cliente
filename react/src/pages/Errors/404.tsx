import Template from "@/layout";

export default function Error404Page() {
  
  return (
    <Template title="Inicio">
      <div className="mt-6 select-none">
        <p className="font-extrabold text-9xl text-center text-primary-500 mb-3">404</p>
        <p className="font-bold text-3xl text-center text-primary-500">Página no encontrada</p>
      </div>
    </Template>
  );
}