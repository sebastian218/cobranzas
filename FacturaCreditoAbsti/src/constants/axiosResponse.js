export const CheckStatus = {
    "data": {
        "appServer": "OK",
        "authServer": "OK",
        "dbServer": "OK"
    }
};

export const GetCompanyCuits = {
    "data": {
        "data": [{
            "sub_client": "sub_client",
            "cuit_item": "30655735629",
            "company_name": "Fallabella"
        }, {
            "sub_client2": "sub_client",
            "cuit_item": "30654535667",
            "company_name": "Amtek"
        }]
    }
};
/* 1CUIT */
export const GetCompanyCuits1 = {
    "data": {
        "data": [{
            "sub_client": "sub_client",
            "cuit_item": "2576876542",
            "company_name": "Easy"
        }]
    }
};
export const GetCreditInvoices = {
    "data": {
        "data": {
            "appServer": "OK",
            "authServer": "OK",
            "dbServer": "OK"
        },
        "arrayObservaciones": ["observation 1", "observation 2", "observation 3", "observation 4"],
        "arrayComprobantes": ["comprobante 1", "comprobante 2", "comprobante 3", "comprobante 4"]
    }
};

export const tiposRetenciones = [{
        codigo: 1,
        descripcion: "Tipo 1"

    },
    {
        codigo: 2,
        descripcion: "Tipo 2"

    }, {
        codigo: 3,
        descripcion: "Tipo 3"

    }
] ;


export const formasCancelacion = [{
          codigo:1,
          descripcion: "Cheque"
}]

export const motivosRechazo = {

    "meta": [],
    "errors": [],
    "data": {
        "codigoDescripcionReturn": {
            "arrayCodigoDescripcion": [{
                    "codigo": 1,
                    "descripcion": "Daño en las mercaderías, cuando no estuviesen expedidaso entregadas por su cuenta y riesgo."
                },
                {
                    "codigo": 2,
                    "descripcion": "Vicios, defectos y diferencias en la calidad o en lacantidad debidamente comprobados."
                },
                {
                    "codigo": 3,
                    "descripcion": "Divergencias en los plazos o en los precios estipulados."
                },
                {
                    "codigo": 4,
                    "descripcion": "No correspondencia con los servicios o la obra efectivamente contratados."
                },
                {
                    "codigo": 5,
                    "descripcion": "Existencia de vicios formales que causen su inhabilidad tanto como titulo ejecutivo y valor no cartular, así como documento comercial."
                },
                {
                    "codigo": 6,
                    "descripcion": "Falta de entrega de la mercadería o prestación del servicio."
                }
            ],
            "arrayErroresFormato": null
        }
    }
}


export const invoiceResponse = {
    "data":

    {
        "meta": [

        ],
        "errors": [

        ],
        "data": {
            "arrayComprobantes": [{
                    "cuitEmisor": 2013104676237,
                    "razonSocialEmi": "PUGLISI WALTER LEONARDO",
                    "codTipoCmp": 201,
                    "ptovta": 11,
                    "nroCmp": 1,
                    "cuitReceptor": 30577873654,
                    "razonSocialRecep": "RZ - FCE",
                    "tipoCodAuto": 1,
                    "codAutorizacion": 69387786930912,
                    "fechaEmision": "2019-09-16T00:00:00",
                    "fechaPuestaDispo": "2019-09-17T00:00:00",
                    "fechaPuestaDispoSpecified": true,
                    "fechaVenPago": "2019-11-18T00:00:00",
                    "fechaVenPagoSpecified": true,
                    "fechaVenAcep": "2019-10-19T00:00:00",
                    "fechaVenAcepSpecified": true,
                    "importeTotal": 3630000,
                    "codMoneda": "PES",
                    "cotizacionMoneda": 1,
                    "CBUEmisor": "1234567890123456789012",
                    "AliasEmisor": "COT.EC.SUD",
                    "esAnulacionSpecified": false,
                    "esPostAceptacionSpecified": false,
                    "idComprobanteAsociado": null,
                    "referenciasComerciales": [
                        "abono mensual"
                    ],
                    "arraySubtotalesIVA": [{
                        "codigo": 5,
                        "baseImponible": 3000000,
                        "importe": 630000
                    }],
                    "arrayOtrosTributos": null,
                    "arrayItems": null,
                    "datosGenerales": null,
                    "datosComerciales": null,
                    "leyendaComercial": null,
                    "codCtaCte": 34953,
                    "estado": {
                        "estado": "Pendiente Recepción",
                        "fechaHoraEstado": "2019-09-23T16:14:54"
                    },
                    "tipoAcep": 1,
                    "tipoAcepSpecified": true,
                    "fechaHoraAcep": "2019-09-23T16:14:54",
                    "fechaHoraAcepSpecified": true,
                    "arrayMotivosRechazo": [{
                        "codMotivo": 2,
                        "descMotivo": "Vicios, defectos y diferencias en la calidad o en la cantidad debidamente comprobados.",
                        "justificacion": "No es de la calidad prometida"
                    }],
                    "infoAgDtpoCltv": 1,
                    "infoAgDtpoCltvSpecified": true,
                    "fechaInfoAgDptoCltvSpecified": false,
                    "idPagoAgDptoCltv": null,
                    "CBUdePago": "1234567890123456789012"
                },
                {
                    "cuitEmisor": 20131046767,
                    "razonSocialEmi": "Esteban Martínez",
                    "codTipoCmp": 201,
                    "ptovta": 11,
                    "nroCmp": 1,
                    "cuitReceptor": 30577873654,
                    "razonSocialRecep": "RZ - FCE",
                    "tipoCodAuto": 1,
                    "codAutorizacion": 69387786930912,
                    "fechaEmision": "2019-09-16T00:00:00",
                    "fechaPuestaDispo": "2019-09-17T00:00:00",
                    "fechaPuestaDispoSpecified": true,
                    "fechaVenPago": "2019-11-18T00:00:00",
                    "fechaVenPagoSpecified": true,
                    "fechaVenAcep": "2019-10-19T00:00:00",
                    "fechaVenAcepSpecified": true,
                    "importeTotal": 3630000,
                    "codMoneda": "PES",
                    "cotizacionMoneda": 1,
                    "CBUEmisor": "1234567890123456789012",
                    "AliasEmisor": "COT.EC.SUD",
                    "esAnulacionSpecified": false,
                    "esPostAceptacionSpecified": false,
                    "idComprobanteAsociado": null,
                    "referenciasComerciales": [
                        "abono mensual"
                    ],
                    "arraySubtotalesIVA": [{
                        "codigo": 5,
                        "baseImponible": 3000000,
                        "importe": 630000
                    }],
                    "arrayOtrosTributos": null,
                    "arrayItems": null,
                    "datosGenerales": null,
                    "datosComerciales": null,
                    "leyendaComercial": null,
                    "codCtaCte": 34953,
                    "estado": {
                        "estado": "Recepcionado",
                        "fechaHoraEstado": "2019-09-23T16:14:54"
                    },
                    "tipoAcep": 1,
                    "tipoAcepSpecified": true,
                    "fechaHoraAcep": "2019-09-23T16:14:54",
                    "fechaHoraAcepSpecified": true,
                    "arrayMotivosRechazo": [{
                        "codMotivo": 2,
                        "descMotivo": "Vicios, defectos y diferencias en la calidad o en la cantidad debidamente comprobados.",
                        "justificacion": "No es de la calidad prometida"
                    }],
                    "infoAgDtpoCltv": 1,
                    "infoAgDtpoCltvSpecified": true,
                    "fechaInfoAgDptoCltvSpecified": false,
                    "idPagoAgDptoCltv": null,
                    "CBUdePago": "1234567890123456789012"
                },
                {
                    "cuitEmisor": 553452124,
                    "razonSocialEmi": "MARIANO ANCHORENA",
                    "codTipoCmp": 201,
                    "ptovta": 11,
                    "nroCmp": 1,
                    "cuitReceptor": 30577873654,
                    "razonSocialRecep": "RZ - FCE",
                    "tipoCodAuto": 1,
                    "codAutorizacion": 69387786930912,
                    "fechaEmision": "2019-09-16T00:00:00",
                    "fechaPuestaDispo": "2019-09-17T00:00:00",
                    "fechaPuestaDispoSpecified": true,
                    "fechaVenPago": "2019-11-18T00:00:00",
                    "fechaVenPagoSpecified": true,
                    "fechaVenAcep": "2019-10-19T00:00:00",
                    "fechaVenAcepSpecified": true,
                    "importeTotal": 3630000,
                    "codMoneda": "PES",
                    "cotizacionMoneda": 1,
                    "CBUEmisor": "1234567890123456789012",
                    "AliasEmisor": "COT.EC.SUD",
                    "esAnulacionSpecified": false,
                    "esPostAceptacionSpecified": false,
                    "idComprobanteAsociado": null,
                    "referenciasComerciales": [
                        "abono mensual"
                    ],
                    "arraySubtotalesIVA": [{
                        "codigo": 5,
                        "baseImponible": 3000000,
                        "importe": 630000
                    }],
                    "arrayOtrosTributos": null,
                    "arrayItems": null,
                    "datosGenerales": null,
                    "datosComerciales": null,
                    "leyendaComercial": null,
                    "codCtaCte": 34953,
                    "estado": {
                        "estado": "Recepcionado",
                        "fechaHoraEstado": "2019-09-23T16:14:54"
                    },
                    "tipoAcep": 1,
                    "tipoAcepSpecified": true,
                    "fechaHoraAcep": "2019-09-23T16:14:54",
                    "fechaHoraAcepSpecified": true,
                    "arrayMotivosRechazo": [{
                        "codMotivo": 2,
                        "descMotivo": "Vicios, defectos y diferencias en la calidad o en la cantidad debidamente comprobados.",
                        "justificacion": "No es de la calidad prometida"
                    }],
                    "infoAgDtpoCltv": 1,
                    "infoAgDtpoCltvSpecified": true,
                    "fechaInfoAgDptoCltvSpecified": false,
                    "idPagoAgDptoCltv": null,
                    "CBUdePago": "1234567890123456789012"
                },
                {
                    "cuitEmisor": 99999999,
                    "razonSocialEmi": "SEBA",
                    "codTipoCmp": 201,
                    "ptovta": 11,
                    "nroCmp": 1,
                    "cuitReceptor": 30577873654,
                    "razonSocialRecep": "RZ - FCE",
                    "tipoCodAuto": 1,
                    "codAutorizacion": 69387786930912,
                    "fechaEmision": "2019-09-16T00:00:00",
                    "fechaPuestaDispo": "2019-09-17T00:00:00",
                    "fechaPuestaDispoSpecified": true,
                    "fechaVenPago": "2019-11-18T00:00:00",
                    "fechaVenPagoSpecified": true,
                    "fechaVenAcep": "2019-10-19T00:00:00",
                    "fechaVenAcepSpecified": true,
                    "importeTotal": 3630000,
                    "codMoneda": "PES",
                    "cotizacionMoneda": 1,
                    "CBUEmisor": "1234567890123456789012",
                    "AliasEmisor": "COT.EC.SUD",
                    "esAnulacionSpecified": false,
                    "esPostAceptacionSpecified": false,
                    "idComprobanteAsociado": null,
                    "referenciasComerciales": [
                        "abono mensual"
                    ],
                    "arraySubtotalesIVA": [{
                        "codigo": 5,
                        "baseImponible": 3000000,
                        "importe": 630000
                    }],
                    "arrayOtrosTributos": null,
                    "arrayItems": null,
                    "datosGenerales": null,
                    "datosComerciales": null,
                    "leyendaComercial": null,
                    "codCtaCte": 34953,
                    "estado": {
                        "estado": "Pendiente Recepción",
                        "fechaHoraEstado": "2019-09-23T16:14:54"
                    },
                    "tipoAcep": 1,
                    "tipoAcepSpecified": true,
                    "fechaHoraAcep": "2019-09-23T16:14:54",
                    "fechaHoraAcepSpecified": true,
                    "arrayMotivosRechazo": [{
                        "codMotivo": 2,
                        "descMotivo": "Vicios, defectos y diferencias en la calidad o en la cantidad debidamente comprobados.",
                        "justificacion": "No es de la calidad prometida"
                    }],
                    "infoAgDtpoCltv": 1,
                    "infoAgDtpoCltvSpecified": true,
                    "fechaInfoAgDptoCltvSpecified": false,
                    "idPagoAgDptoCltv": null,
                    "CBUdePago": "1234567890123456789012"
                }
            ],
            "evento": null,
            "arrayObservaciones": null,
            "arrayErrores": null,
            "arrayErroresFormato": null
        }
    }
};

export const GetAllInvoices = {
    "data":

    {
        "meta": [

        ],
        "errors": [

        ],
        "data": {
            "arrayComprobantes": [{
                    "cuitEmisor": 20131046767,
                    "razonSocialEmi": "PUGLISI WALTER LEONARDO",
                    "codTipoCmp": 201,
                    "ptovta": 11,
                    "nroCmp": 1,
                    "cuitReceptor": 30577873654,
                    "razonSocialRecep": "RZ - FCE",
                    "tipoCodAuto": 1,
                    "codAutorizacion": 69387786930912,
                    "fechaEmision": "2019-09-16T00:00:00",
                    "fechaPuestaDispo": "2019-09-17T00:00:00",
                    "fechaPuestaDispoSpecified": true,
                    "fechaVenPago": "2019-11-18T00:00:00",
                    "fechaVenPagoSpecified": true,
                    "fechaVenAcep": "2019-10-19T00:00:00",
                    "fechaVenAcepSpecified": true,
                    "importeTotal": 3630000,
                    "codMoneda": "PES",
                    "cotizacionMoneda": 1,
                    "CBUEmisor": "1234567890123456789012",
                    "AliasEmisor": "COT.EC.SUD",
                    "esAnulacionSpecified": false,
                    "esPostAceptacionSpecified": false,
                    "idComprobanteAsociado": null,
                    "referenciasComerciales": [
                        "abono mensual"
                    ],
                    "arraySubtotalesIVA": [{
                        "codigo": 5,
                        "baseImponible": 3000000,
                        "importe": 630000
                    }],
                    "arrayOtrosTributos": null,
                    "arrayItems": null,
                    "datosGenerales": null,
                    "datosComerciales": null,
                    "leyendaComercial": null,
                    "codCtaCte": 34953,
                    "estado": {
                        "estado": "Cancelado",
                        "fechaHoraEstado": "2019-09-23T16:14:54"
                    },
                    "tipoAcep": 1,
                    "tipoAcepSpecified": true,
                    "fechaHoraAcep": "2019-09-23T16:14:54",
                    "fechaHoraAcepSpecified": true,
                    "arrayMotivosRechazo": [{
                        "codMotivo": 2,
                        "descMotivo": "Vicios, defectos y diferencias en la calidad o en la cantidad debidamente comprobados.",
                        "justificacion": "No es de la calidad prometida"
                    }],
                    "infoAgDtpoCltv": 1,
                    "infoAgDtpoCltvSpecified": true,
                    "fechaInfoAgDptoCltvSpecified": false,
                    "idPagoAgDptoCltv": null,
                    "CBUdePago": "1234567890123456789012"
                },
                {
                    "cuitEmisor": 99999999,
                    "razonSocialEmi": "SEBA",
                    "codTipoCmp": 201,
                    "ptovta": 11,
                    "nroCmp": 1,
                    "cuitReceptor": 30577873654,
                    "razonSocialRecep": "RZ - FCE",
                    "tipoCodAuto": 1,
                    "codAutorizacion": 69387786930912,
                    "fechaEmision": "2019-09-16T00:00:00",
                    "fechaPuestaDispo": "2019-09-17T00:00:00",
                    "fechaPuestaDispoSpecified": true,
                    "fechaVenPago": "2019-11-18T00:00:00",
                    "fechaVenPagoSpecified": true,
                    "fechaVenAcep": "2019-10-19T00:00:00",
                    "fechaVenAcepSpecified": true,
                    "importeTotal": 3630000,
                    "codMoneda": "PES",
                    "cotizacionMoneda": 1,
                    "CBUEmisor": "1234567890123456789012",
                    "AliasEmisor": "COT.EC.SUD",
                    "esAnulacionSpecified": false,
                    "esPostAceptacionSpecified": false,
                    "idComprobanteAsociado": null,
                    "referenciasComerciales": [
                        "abono mensual"
                    ],
                    "arraySubtotalesIVA": [{
                        "codigo": 5,
                        "baseImponible": 3000000,
                        "importe": 630000
                    }],
                    "arrayOtrosTributos": null,
                    "arrayItems": null,
                    "datosGenerales": null,
                    "datosComerciales": null,
                    "leyendaComercial": null,
                    "codCtaCte": 34953,
                    "estado": {
                        "estado": "Aceptado",
                        "fechaHoraEstado": "2019-09-23T16:14:54"
                    },
                    "tipoAcep": 1,
                    "tipoAcepSpecified": true,
                    "fechaHoraAcep": "2019-09-23T16:14:54",
                    "fechaHoraAcepSpecified": true,
                    "arrayMotivosRechazo": [{
                        "codMotivo": 2,
                        "descMotivo": "Vicios, defectos y diferencias en la calidad o en la cantidad debidamente comprobados.",
                        "justificacion": "No es de la calidad prometida"
                    }],
                    "infoAgDtpoCltv": 1,
                    "infoAgDtpoCltvSpecified": true,
                    "fechaInfoAgDptoCltvSpecified": false,
                    "idPagoAgDptoCltv": null,
                    "CBUdePago": "1234567890123456789012"
                },
                {
                    "cuitEmisor": 88888888,
                    "razonSocialEmi": "PEDRO 1",
                    "codTipoCmp": 201,
                    "ptovta": 11,
                    "nroCmp": 1,
                    "cuitReceptor": 30577873654,
                    "razonSocialRecep": "RZ - FCE",
                    "tipoCodAuto": 1,
                    "codAutorizacion": 69387786930912,
                    "fechaEmision": "2019-09-16T00:00:00",
                    "fechaPuestaDispo": "2019-09-17T00:00:00",
                    "fechaPuestaDispoSpecified": true,
                    "fechaVenPago": "2019-11-18T00:00:00",
                    "fechaVenPagoSpecified": true,
                    "fechaVenAcep": "2019-10-19T00:00:00",
                    "fechaVenAcepSpecified": true,
                    "importeTotal": 3630000,
                    "codMoneda": "PES",
                    "cotizacionMoneda": 1,
                    "CBUEmisor": "1234567890123456789012",
                    "AliasEmisor": "COT.EC.SUD",
                    "esAnulacionSpecified": false,
                    "esPostAceptacionSpecified": false,
                    "idComprobanteAsociado": null,
                    "referenciasComerciales": [
                        "abono mensual"
                    ],
                    "arraySubtotalesIVA": [{
                        "codigo": 5,
                        "baseImponible": 3000000,
                        "importe": 630000
                    }],
                    "arrayOtrosTributos": null,
                    "arrayItems": null,
                    "datosGenerales": null,
                    "datosComerciales": null,
                    "leyendaComercial": null,
                    "codCtaCte": 34953,
                    "estado": {
                        "estado": "Rechazado",
                        "fechaHoraEstado": "2019-09-23T16:14:54"
                    },
                    "tipoAcep": 1,
                    "tipoAcepSpecified": true,
                    "fechaHoraAcep": "2019-09-23T16:14:54",
                    "fechaHoraAcepSpecified": true,
                    "arrayMotivosRechazo": [{
                        "codMotivo": 2,
                        "descMotivo": "Vicios, defectos y diferencias en la calidad o en la cantidad debidamente comprobados.",
                        "justificacion": "No es de la calidad prometida"
                    }],
                    "infoAgDtpoCltv": 1,
                    "infoAgDtpoCltvSpecified": true,
                    "fechaInfoAgDptoCltvSpecified": false,
                    "idPagoAgDptoCltv": null,
                    "CBUdePago": "1234567890123456789012"
                }
            ],
            "evento": null,
            "arrayObservaciones": null,
            "arrayErrores": null,
            "arrayErroresFormato": null
        }
    }
};


export const getOnlyAsociatedDocuments = {
    "meta": [

    ],
    "errors": [

    ],
    "data": {
        "arrayComprobantes": [{
                "cuitEmisor": 30500783342,
                "razonSocialEmi": "HIDRO MECANICA ARGENTINA S A",
                "codTipoCmp": 203,
                "ptovta": 26,
                "nroCmp": 3,
                "cuitReceptor": "30--------8",
                "razonSocialRecep": "EMPRESA DE ENERGÍA S.A.",
                "tipoCodAuto": 1,
                "codAutorizacion": 69412914920437,
                "fechaEmision": "2019-10-10T00:00:00",
                "fechaPuestaDispo": "2019-10-10T00:00:00",
                "fechaPuestaDispoSpecified": true,
                "fechaVenPagoSpecified": false,
                "fechaVenAcep": "2019-11-02T00:00:00",
                "fechaVenAcepSpecified": true,
                "importeTotal": 234459.28,
                "codMoneda": "PES",
                "cotizacionMoneda": 1,
                "CBUEmisor": null,
                "AliasEmisor": null,
                "esAnulacion": 1,
                "esAnulacionSpecified": true,
                "esPostAceptacion": 1,
                "esPostAceptacionSpecified": true,
                "idComprobanteAsociado": {
                    "CUITEmisor": 30500783342,
                    "codTipoCmp": 201,
                    "ptoVta": 26,
                    "nroCmp": 5
                },
                "referenciasComerciales": null,
                "arraySubtotalesIVA": [{
                    "codigo": 5,
                    "baseImponible": 193768,
                    "importe": 40691.28
                }],
                "arrayOtrosTributos": [{
                        "codigo": 1,
                        "detalle": "Per./Ret. de Impuesto a las Ganancias",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 1,
                        "detalle": "Per./Ret. de IVA",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 2,
                        "detalle": "Per./Ret. Ingresos Brutos",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 4,
                        "detalle": "Impuestos Internos",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 3,
                        "detalle": "Impuestos Municipales",
                        "baseImponible": 0,
                        "importe": 0
                    }
                ],
                "arrayItems": [{
                    "orden": 1,
                    "unidadesMtxSpecified": false,
                    "codigoMtx": null,
                    "codigo": "01",
                    "descripcion": "ANULA FACTURA DE CRÉDITO ELECTRONICA MiPyMEs Nº5",
                    "codNomMercosur": null,
                    "cantidad": 1,
                    "cantidadSpecified": true,
                    "codigoUnidadMedida": 7,
                    "codigoUnidadMedidaSpecified": true,
                    "precioUnitario": 193768,
                    "precioUnitarioSpecified": true,
                    "importeBonificacion": 0,
                    "importeBonificacionSpecified": true,
                    "codigoCondicionIVA": 5,
                    "importeIVA": 40691.28,
                    "importeIVASpecified": true,
                    "importeItem": 234459.28
                }],
                "datosGenerales": null,
                "datosComerciales": null,
                "leyendaComercial": "ANULA FACTURA DE CRÉDITO ELECTRONICA MI PyMEs nº 00026-00000005",
                "codCtaCte": 226909,
                "estado": {
                    "estado": "Recepcionado",
                    "fechaHoraEstado": "2019-10-12T00:30:15"
                },
                "tipoAcepSpecified": false,
                "fechaHoraAcepSpecified": false,
                "arrayMotivosRechazo": null,
                "infoAgDtpoCltvSpecified": false,
                "fechaInfoAgDptoCltvSpecified": false,
                "idPagoAgDptoCltv": null,
                "CBUdePago": null
            },
            {
                "cuitEmisor": 30500783342,
                "razonSocialEmi": "HIDRO MECANICA ARGENTINA S A",
                "codTipoCmp": 202,
                "ptovta": 13,
                "nroCmp": 3,
                "cuitReceptor": "30--------8",
                "razonSocialRecep": "EMPRESA DE ENERGÍA S.A.",
                "tipoCodAuto": 1,
                "codAutorizacion": 69412914920437,
                "fechaEmision": "2019-10-10T00:00:00",
                "fechaPuestaDispo": "2019-10-10T00:00:00",
                "fechaPuestaDispoSpecified": true,
                "fechaVenPagoSpecified": false,
                "fechaVenAcep": "2019-11-02T00:00:00",
                "fechaVenAcepSpecified": true,
                "importeTotal": 3000.28,
                "codMoneda": "PES",
                "cotizacionMoneda": 1,
                "CBUEmisor": null,
                "AliasEmisor": null,
                "esAnulacion": 1,
                "esAnulacionSpecified": true,
                "esPostAceptacion": 1,
                "esPostAceptacionSpecified": true,
                "idComprobanteAsociado": {
                    "CUITEmisor": 30500783342,
                    "codTipoCmp": 201,
                    "ptoVta": 26,
                    "nroCmp": 5
                },
                "referenciasComerciales": null,
                "arraySubtotalesIVA": [{
                    "codigo": 5,
                    "baseImponible": 193768,
                    "importe": 40691.28
                }],
                "arrayOtrosTributos": [{
                        "codigo": 1,
                        "detalle": "Per./Ret. de Impuesto a las Ganancias",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 1,
                        "detalle": "Per./Ret. de IVA",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 2,
                        "detalle": "Per./Ret. Ingresos Brutos",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 4,
                        "detalle": "Impuestos Internos",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 3,
                        "detalle": "Impuestos Municipales",
                        "baseImponible": 0,
                        "importe": 0
                    }
                ],
                "arrayItems": [{
                    "orden": 1,
                    "unidadesMtxSpecified": false,
                    "codigoMtx": null,
                    "codigo": "01",
                    "descripcion": "ANULA FACTURA DE CRÉDITO ELECTRONICA MiPyMEs Nº5",
                    "codNomMercosur": null,
                    "cantidad": 1,
                    "cantidadSpecified": true,
                    "codigoUnidadMedida": 7,
                    "codigoUnidadMedidaSpecified": true,
                    "precioUnitario": 193768,
                    "precioUnitarioSpecified": true,
                    "importeBonificacion": 0,
                    "importeBonificacionSpecified": true,
                    "codigoCondicionIVA": 5,
                    "importeIVA": 40691.28,
                    "importeIVASpecified": true,
                    "importeItem": 234459.28
                }],
                "datosGenerales": null,
                "datosComerciales": null,
                "leyendaComercial": "ANULA FACTURA DE CRÉDITO ELECTRONICA MI PyMEs nº 00026-00000005",
                "codCtaCte": 226909,
                "estado": {
                    "estado": "Recepcionado",
                    "fechaHoraEstado": "2019-10-12T00:30:15"
                },
                "tipoAcepSpecified": false,
                "fechaHoraAcepSpecified": false,
                "arrayMotivosRechazo": null,
                "infoAgDtpoCltvSpecified": false,
                "fechaInfoAgDptoCltvSpecified": false,
                "idPagoAgDptoCltv": null,
                "CBUdePago": null
            },
            {
                "cuitEmisor": 30500783342,
                "razonSocialEmi": "HIDRO MECANICA ARGENTINA S A",
                "codTipoCmp": 207,
                "ptovta": 34,
                "nroCmp": 3,
                "cuitReceptor": "30--------8",
                "razonSocialRecep": "EMPRESA DE ENERGÍA S.A.",
                "tipoCodAuto": 1,
                "codAutorizacion": 69412914920437,
                "fechaEmision": "2019-10-10T00:00:00",
                "fechaPuestaDispo": "2019-10-10T00:00:00",
                "fechaPuestaDispoSpecified": true,
                "fechaVenPagoSpecified": false,
                "fechaVenAcep": "2019-11-02T00:00:00",
                "fechaVenAcepSpecified": true,
                "importeTotal": 54578.28,
                "codMoneda": "PES",
                "cotizacionMoneda": 1,
                "CBUEmisor": null,
                "AliasEmisor": null,
                "esAnulacion": 1,
                "esAnulacionSpecified": true,
                "esPostAceptacion": 1,
                "esPostAceptacionSpecified": true,
                "idComprobanteAsociado": {
                    "CUITEmisor": 30500783342,
                    "codTipoCmp": 201,
                    "ptoVta": 26,
                    "nroCmp": 5
                },
                "referenciasComerciales": null,
                "arraySubtotalesIVA": [{
                    "codigo": 5,
                    "baseImponible": 193768,
                    "importe": 40691.28
                }],
                "arrayOtrosTributos": [{
                        "codigo": 1,
                        "detalle": "Per./Ret. de Impuesto a las Ganancias",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 1,
                        "detalle": "Per./Ret. de IVA",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 2,
                        "detalle": "Per./Ret. Ingresos Brutos",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 4,
                        "detalle": "Impuestos Internos",
                        "baseImponible": 0,
                        "importe": 0
                    },
                    {
                        "codigo": 3,
                        "detalle": "Impuestos Municipales",
                        "baseImponible": 0,
                        "importe": 0
                    }
                ],
                "arrayItems": [{
                    "orden": 1,
                    "unidadesMtxSpecified": false,
                    "codigoMtx": null,
                    "codigo": "01",
                    "descripcion": "ANULA FACTURA DE CRÉDITO ELECTRONICA MiPyMEs Nº5",
                    "codNomMercosur": null,
                    "cantidad": 1,
                    "cantidadSpecified": true,
                    "codigoUnidadMedida": 7,
                    "codigoUnidadMedidaSpecified": true,
                    "precioUnitario": 193768,
                    "precioUnitarioSpecified": true,
                    "importeBonificacion": 0,
                    "importeBonificacionSpecified": true,
                    "codigoCondicionIVA": 5,
                    "importeIVA": 40691.28,
                    "importeIVASpecified": true,
                    "importeItem": 234459.28
                }],
                "datosGenerales": null,
                "datosComerciales": null,
                "leyendaComercial": "ANULA FACTURA DE CRÉDITO ELECTRONICA MI PyMEs nº 00026-00000005",
                "codCtaCte": 226909,
                "estado": {
                    "estado": "Recepcionado",
                    "fechaHoraEstado": "2019-10-12T00:30:15"
                },
                "tipoAcepSpecified": false,
                "fechaHoraAcepSpecified": false,
                "arrayMotivosRechazo": null,
                "infoAgDtpoCltvSpecified": false,
                "fechaInfoAgDptoCltvSpecified": false,
                "idPagoAgDptoCltv": null,
                "CBUdePago": null
            }
        ],
        "evento": null,
        "arrayObservaciones": null,
        "arrayErrores": null,
        "arrayErroresFormato": null
    }
}