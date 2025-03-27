import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import useAuthContext from "@/hooks/AuthContext/hook";
import { Link, useNavigate } from 'react-router';
import Template from "@/layout";
import VentaService from "@/services/Ventas";
import { VentaResponse } from "@/services/Ventas/types";
import timestamp from '@/utils/timestamp';


export default function VentaListar() {
    const auth = useAuthContext();
    const navigate = useNavigate();

    //Variable de estado para manejar las ventas
    const [ventas, setVentas] = useState<VentaResponse[]>([]);

    //Mediante el hook useEffect se obtienen las ventas de la APi
    useEffect(() => {
        if (!auth.token) return;
        VentaService.listar(auth.token)
            .then(ventas => setVentas(ventas))
            .catch(e => {
                if (e instanceof Error) alert(e.message);
                else alert("Ocurrio un error al cargar las ventas");
                navigate("/", { replace: true });
            });
    }, [auth.token]);


    return (
        <Template title="Mis pedidos">
            <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">Mis pedidos</h2>

            <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-quinary-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="text-center px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Fecha de la venta
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Fecha de pago
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Realizado en
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Metodo de pago
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta, idx) => (
                            <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {idx + 1}
                                </th>
                                <th
                                    scope="row"
                                    className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {timestamp.format(venta.fecha_venta, true)}
                                </th>
                                <td className="text-center px-6 py-4">{timestamp.format(venta.fecha_pago, true)}</td>
                                <td className="text-center px-6 py-4">{venta.estado}</td>
                                <td className="text-center px-6 py-4">CLIENTE</td>
                                <td className="text-center px-6 py-4">{venta.metodo_pago}</td>

                                <td className="text-center px-6 py-4 flex gap-4 justify-center items-center">
                                    <Link to={`/venta/mostrar/${venta._id}`} className="flex justify-center items-center">
                                        <IconEye className="text-quaternary-500 hover:scale-105 cursor-pointer" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Template >
    );





}