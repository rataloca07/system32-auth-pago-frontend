import React from 'react'
import CONFIG from '../Configuracion/Config'
import swal from 'sweetalert';
import Select from 'react-select';
class AuthRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deshabilitar: true,
            selectedOption: null,
            selectedOption2: null,
            n_autorizacion: this.props.n_autorizacion,
            fecha_emision: this.props.fecha_emision,
            importe: this.props.importe,
            penalidad: this.props.penalidad,
            amortizacion: this.props.amortizacion,
            saldo: this.props.saldo,
            fecha_vencimieto: this.props.fecha_vencimieto,
            autorizacion_estado: this.props.autorizacion_estado
        }
        this.xd = this.xd.bind(this);
    }

    xd(){
        this.setState({
            deshabilitar:false
        })
        console.log("edita");

      /*var editImporte = this.props.importe.toString();
      var _importe_ = this.props.importe;
      document.getElementById(editImporte).value = _importe_;
      document.getElementById(editImporte).disabled = false;
      document.getElementById(editImporte).style.background = '#F2F2F2';
      document.getElementById(editImporte).focus();*/


    }

    render() {

        return (
            <tr >
                    <td className="td"></td>
                    <td className="td"> {this.props.n_autorizacion} </td>
                    <td className="td"> {this.props.fecha_emision} </td>
                    <td className="td"><input className="center-align inp-auth" type="text" disabled={this.state.deshabilitar} placeholder="sin especificar" ></input></td>
                    <td className="td"><input className="center-align inp-auth" type="text" id={this.props.importe} disabled={this.state.deshabilitar} placeholder={this.props.importe}></input></td>
                    <td className="td"><input className="center-align inp-auth" type="text" disabled={this.state.deshabilitar} placeholder={this.props.penalidad}></input></td>
                    <td className="td"><input className="center-align inp-auth" type="text" disabled={this.state.deshabilitar} placeholder={this.props.amortizacion}></input></td>
                    <td className="td"><input className="center-align inp-auth" type="text" disabled={this.state.deshabilitar} placeholder={this.props.saldo}></input></td>
                    <td className="td"><input className="center-align inp-auth" type="text" disabled={this.state.deshabilitar} placeholder={this.props.fecha_vencimieto}></input></td>
                    <td className="td"><input className="center-align inp-auth" type="text" disabled={this.state.deshabilitar} placeholder={this.props.autorizacion_estado}></input></td>
                    <td className="td"><a onClick={this.xd} className="waves-effect waves-light btn"><i className="large material-icons center grey-text text-lighten-5">edit</i></a></td>
                </tr>
        )
    }
}

export default AuthRow;
