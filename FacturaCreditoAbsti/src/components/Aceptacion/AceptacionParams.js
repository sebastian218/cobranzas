import { toNumber } from "../../helpers/helpers";

export default class AceptacionParams {


    idCtaCte = {};
    arrayConfirmarNotasDC = [];
    arrayFormasCancelacion = [];
    arrayRetenciones = [];
    arrayAjustesOperacion = [];
    importeCancelado = 0;
    importeTotalRetPesos = 0;
    importeEmbargoPesos = 0;
    saldoAceptado = 0;
    codMoneda = "PES";
    cotizacionMonedaUlt = 1;

    constructor(factura,
        notasAsociadas,
        cancelaciones,
        retenciones,
        importeCancelado,
        montoRetenciones,
        importeEmbargos,
        saldoAceptado
        ) {

        this.setidCtaCte(factura);
        this.setArrayConfirmarNotasDC(notasAsociadas);
        this.setArrayFormasCancelacion(cancelaciones);
        this.setArrayRetenciones(retenciones);
        this.setImporteCancelado(importeCancelado);
        this.setImporteTotalRetPesos(montoRetenciones);
        this.setImporteEmbargoPesos(importeEmbargos);
        this.setSaldoAceptado(saldoAceptado);
        

    }
    getParams() {
        return {
            idCtaCte: this.getidCtaCte(),
            arrayConfirmarNotasDC: this.getArrayConfirmarNotasDC(),
            arrayFormasCancelacion: this.getArrayFormasCancelacion(),
            arrayRetenciones: this.getArrayRetenciones(),
            arrayAjustesOperacion: this.getArrayAjustesOperacion(),
            importeCancelado: this.getImporteCancelado(),
            importeTotalRetPesos: this.getImporteTotalRetPesos(),
            importeEmbargoPesos: this.getImporteEmbargoPesos(),
            saldoAceptado: this.getSaldoAceptado(),
            codMoneda: this.getCodMoneda(),
            cotizacionMonedaUlt: this.getCotizacionMonedaUlt()
        }
    }
    getidCtaCte() {
        return this.idCtaCte;
    }
    setidCtaCte(factura) {
        let idCtaCte = {
            cuitEmisor: 0,
            codTipoComprobante: 0,
            ptoVta: 0,
            nroCmp: 0
        }
        idCtaCte.cuitEmisor = factura.cuitEmisor;
        idCtaCte.codTipoComprobante = factura.codTipoCmp;
        idCtaCte.ptoVta = factura.ptovta;
        idCtaCte.nroCmp = factura.nroCmp;
        this.idCtaCte = idCtaCte;
    }
    getArrayConfirmarNotasDC() {
        return this.arrayConfirmarNotasDC;
    }
    setArrayConfirmarNotasDC(notasAsociadas) {
        let notasDC = [];
        notasAsociadas.forEach(nota => {
            switch (nota.codTipoCmp) {
                case 203:
                case 208:
                case 213:
                    let notaDC = {
                        aceptaField: nota.tipoAcepFieldSpecified ? "S" : "N",
                        idNota: {
                            cuitEmisor: nota.cuitEmisor,
                            codTipoCmpField: nota.codTipoCmp,
                            ptoVtaField: nota.ptovta,
                            nroCmpField: nota.nroCmp
                        }
                    }
                    notasDC.push(notaDC)
                    break
                default:
                    break;
            }
        });

        this.arrayConfirmarNotasDC = notasDC;
    }
    getArrayFormasCancelacion() {
        return this.arrayFormasCancelacion;
    }
    setArrayFormasCancelacion(value) {
        value.forEach((cancelacion) => {
            this.arrayFormasCancelacion.push(cancelacion.forma);
        })
    }
    getArrayRetenciones() {
        return this.arrayRetenciones;
    }
    setArrayRetenciones(value) {
        value.forEach((retencion) => {
            this.arrayRetenciones.push({
                codTipoField: Number(retencion.tipo),
                importeField: toNumber(retencion.importe),
                porcentajeField: Number(retencion.porcentaje.replace(/,/g, '.')),
                descMotivoField: retencion.motivo
            })
        })

    }
    getArrayAjustesOperacion() {
        return this.arrayAjustesOperacion;
    }
    setArrayAjustesOperacion(value) {
        this.arrayAjustesOperacion = value;
    }
    getImporteCancelado() {
        return this.importeCancelado;
    }
    setImporteCancelado(value) {
        this.importeCancelado = value;
    }
    getImporteTotalRetPesos() {
        return this.importeTotalRetPesos;
    }
    setImporteTotalRetPesos(value) {
        this.importeTotalRetPesos = value;
    }
    getImporteEmbargoPesos() {
        return this.importeEmbargoPesos;
    }
    setImporteEmbargoPesos(value) {
        this.importeEmbargoPesos = value;
    }
    getSaldoAceptado() {
        return this.saldoAceptado;
    }
    setSaldoAceptado(value) {
        this.saldoAceptado = value;
    }
    getCodMoneda() {
        return this.codMoneda;
    }
    setCodMoneda(value) {
        this.codMoneda = value;
    }
    getCotizacionMonedaUlt() {
        return this.cotizacionMonedaUlt;
    }
    setCotizacionMonedaUlt(value) {
        this.cotizacionMonedaUlt = value;
    }


}

