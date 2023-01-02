const { request, response } = require('express');
const esAdminRole = (req = request, res = response, next) => {
    const usuario = req.usuario;
    if (!usuario) {
        return res.status(500).json({
            msg: "Se requiere verificar el role sin validar el token primero"
        });
    }
    
    const {rol, nombre} = usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es un administrador`
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return (req= request, res = response, next) => {
        const usuario = req.usuario;
        if (!usuario) {
            return res.status(500).json({
                msg: "Se requiere verificar el role sin validar el token primero"
            });
        }

        if (!roles.includes(usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere de uno de estos roles ${ roles }`
            });
        }
        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}