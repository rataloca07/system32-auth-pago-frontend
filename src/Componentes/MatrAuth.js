import React from 'react'
import '../App.css'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
import Select from 'react-select';
import { browserHistory } from 'react-router-3';
import AuthRow from './AuthRow';
class MatrAuth extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            deshabilitar: true,
            codigo: this.props.params.codigoAlumno,
            datosAmA: [],
            cab: [],
            alumno: [],
            historias: [],
            obtenerDesc: [,]
        }
        this.cab = '';
        this.datosAmA = '';
        this.alumno = '';
        this.historias = '';
        this.obtenerDesc = '';
    }
    Regresar(e) {
        browserHistory.push('/');
        e.preventDefault();
    }

    componentDidMount() {
        fetch(CONFIG + '/matriculacab/buscar/' + this.state.codigo)
            .then((response) => {
                return response.json()
            }).then((cab) => {


                console.log("datos de cabecera");
                console.log(cab);
                this.setState({ cab: cab })

            })
            .catch(error => {
                console.error(error)
            });
        fetch(CONFIG + 'alumnomatriculaautorizacion/buscar/' + this.state.codigo)
            .then((response) => {
                return response.json()
            }).then((datos) => {


                console.log("datos de alumno matricula autorizacion");
                console.log(datos);
                this.setState({ datosAmA: datos })

            })
            .catch(error => {
                console.error(error)
            });
        fetch(CONFIG + 'alumnoprograma/buscarc/' + this.state.codigo)
            .then((response) => {
                return response.json()
            }).then((alu) => {


                console.log("datos de alumno");
                console.log(alu);
                this.setState({ alumno: alu })

            })
            .catch(error => {
                console.error(error)
            });
        fetch(CONFIG + 'alumnomatriculaautorizacionhistoria/buscar/' + this.state.codigo)
            .then((response) => {
                return response.json()
            }).then((hist) => {


                console.log("datos de alumno-historias");
                console.log(hist);
                this.setState({ historias: hist })

            })
            .catch(error => {
                console.error(error)
            });

        fetch(CONFIG + 'conceptodescuento/obtener/' + this.state.codigo)
            .then((response) => {
                return response.json()
            }).then((descuento) => {


                console.log("obtener datos del descuento");
                console.log(descuento);
                this.setState({ obtenerDesc: descuento })

            })
            .catch(error => {
                console.error(error)
            });



    }


    render() {
        const datos = this.state.datosAmA.map((datoAmA, i) => {
            return (
                <AuthRow importe={datoAmA.importe} n_autorizacion={datoAmA.n_autorizacion} fecha_emision={datoAmA.fecha_emision}
                    penalidad={datoAmA.penalidad} amortizacion={datoAmA.amortizacion} saldo={datoAmA.saldo} fecha_vencimieto={datoAmA.fecha_vencimieto}
                    autorizacion_estado={datoAmA.autorizacion_estado} />
            )
        })
        const historias = this.state.historias.map((historia, i) => {
            return (
                <tr key={i}>
                    <td className="td">{historia.cod_semestre}</td>
                    <td className="td">{historia.ciclo}</td>
                    <td className="td">{historia.creditos}</td>
                    <td className="td">{historia.sigla_programa}</td>
                </tr>
            )

        })

        const descuento = this.state.obtenerDesc.map((obtenerDesc, i) => {
            return (
                <tr key={i}>
                    <td className="td">{obtenerDesc.concepto}</td>
                    <td className="td">{obtenerDesc.descripcion_min}</td>
                    <td className="td">{obtenerDesc.credito}</td>
                    <td className="td">{obtenerDesc.importe}</td>
                    <td className="td">{obtenerDesc.descuento}</td>
                    <td className="td">{obtenerDesc.importe_final}</td>                    
                    <td className="td">{obtenerDesc.cuotas}</td>

                </tr>
            )

        })


        return (
            <div>
                <h3>Estado de matricula por autorizacion<ul id="nav-mobile" className="right  hide-on-med-and-down"><li><a className="seleccionar" onClick={this.Regresar.bind(this)}>Regresar<i className="material-icons right">reply</i></a></li></ul></h3>
                <div className="SplitPane row">
                    <div className="col-xs-3">
                        <div className="Alumno">
                            <h4 className="center ">Datos personales</h4>
                            <div className="center datos">
                                <div>
                                    <i className="material-icons medium">account_circle</i>
                                </div>
                                <b>Codigo:</b>
                                <div></div>
                                <div className="negro"> {this.state.alumno.codAlumno} </div>
                                <b>Nombres:</b>
                                <div></div>
                                <div className="negro">{this.state.alumno.nomAlumno} {this.state.alumno.apePaterno} {this.state.alumno.apeMaterno}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-9">
                        <div className="SplitPane row">
                            <div className="inline col-xs-5">
                                <table className="tabla1--table">
                                    <thead>
                                        <tr>
                                            <th className="th">SEMESTRE</th>
                                            <th className="th">CICLO</th>
                                            <th className="th">CREDITOS</th>
                                            <th className="th">PROGRAMA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historias}
                                    </tbody>
                                </table>
                            </div>
                            <div className="inline col-xs-3">
                                <table className="tabla2--table">
                                    <thead>
                                        <tr>
                                            <th className="th">CONCEPTO</th>
                                            <th className="th">DESCRIPCION</th>
                                            <th className="th">CRÉDITO</th>
                                            <th className="th">IMPORTE</th>
                                            <th className="th">DESCUENTO</th>
                                            <th className="th">IMPORTE FINAL</th>
                                            <th className="th">CUOTAS</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {descuento}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table-small">
                            <thead>
                                <tr>
                                    <th className="th">N°</th>
                                    <th className="th">OPERACION</th>
                                    <th className="th ancho">FECHA DE EMISION</th>

                                    <th className="th">N° COMPROBANTE</th>
                                    <th className="th">IMPORTE</th>
                                    <th className="th">AMORTIZACION</th>
                                    <th className="th">PENALIDAD</th>
                                    <th className="th">SALDO</th>
                                    <th className="th">FECHA DE VENCIMIENTO</th>
                                    <th className="th">CONDICION</th>
                                    <th className="th">EDITAR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos}
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer>
                    <div className="row center-xs centrar color">Proyecto SIGAP © 2019</div>
                </footer>
            </div >
        );
    }

}

export default MatrAuth