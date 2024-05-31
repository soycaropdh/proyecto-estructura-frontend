import axios from "axios";

const VENTAS_BASE_REST_API_URL = "http://localhost:8080/api/v1/registrodeventas";

class VentasService {
    getAllVentas() {
        return axios.get(`${VENTAS_BASE_REST_API_URL}/findAll`);
    }

    createVenta(venta) {
        return axios.post(VENTAS_BASE_REST_API_URL, venta);
    }

    getVentaById(ventaId) {
        return axios.get(`${VENTAS_BASE_REST_API_URL}/PorId/${ventaId}`);
    }

    updateVenta(ventaId, venta) {
        return axios.put(`${VENTAS_BASE_REST_API_URL}/${ventaId}`, venta);
    }

    deleteVenta(ventaId) {
        return axios.delete(`${VENTAS_BASE_REST_API_URL}/${ventaId}`);
    }
}

export default new VentasService();

