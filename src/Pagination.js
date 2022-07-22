import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Pagination extends Component {

    componentDidMount(){
        this.props.setTotal();
    }

    paginas = ()=>{
        var posts = this.props.pagina.total;
        var total = Math.ceil(posts/3);

        var init = 1;
        var end = 10;

        if(total <= 10){
            end = total;
        } else if ( total > 10){
            // Final
            if(this.props.pagina.page >= total-4){
                init = total - 9;
                end = total;
            }

            // Inicio
            else if (this.props.pagina.page -4 <= 0){
                init = 1;
                end = 10;
            }

            // Todo lo demás
            else {
                init = this.props.pagina.page -4;
                end = this.props.pagina.page +5;
            }
        }

        var lista = [];

        var barra = () => {
            for(var i = init; i <= end; i++){
                lista = lista.concat(
                <th key={i} onClick={(e)=>{
                    this.props.setCurrent(parseInt(e.target.innerHTML));
                    {/* console.log(e.target.innerHTML); */}
                    }} >
                    {i}
                </th>
                )
            }

            return lista;
        }

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            {barra()}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    render () {
        return (
            <div>
                <h4>
                    Nº de página { this.props.pagina.page }
                </h4>
                {this.paginas()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pagina: state.pagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTotal: ()=>{
            axios.get('https://blog-api-u.herokuapp.com/v1/totalposts')
            .then(function(response){
                dispatch({type: 'SET_TOTAL', total: parseInt(response.data)})
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })
        },
        setCurrent: (e) => {
            dispatch({type: 'SET_CURRENT', page: e});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)

