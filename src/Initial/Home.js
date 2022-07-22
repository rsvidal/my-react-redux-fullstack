import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import Pagination from '../Pagination.js';

// const Home = (props) => {
//     return (
//         <div>
//             <h4>Home</h4>
//             {Posts}
//         </div>
//     )
// }

class Home extends Component{

    componentDidMount(){
        this.props.dispatch1();
    }

    componentWillUnmount(){
        this.props.clear();
    }

    allPosts = () => {
        const Posts = this.props.allPosts.map((post)=>{
            return(
                <h4 key={post.id} >{post.title}</h4>
            )
        });
        return Posts;
    }

    render(){
        return(
            <div>
                <h2>Hola desde el nuevo Component</h2>
                <Pagination/>

                <h2>Posts (Obtenidos desde Base de Datos alojada en Heroku Cloud)</h2>
                {this.allPosts()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allPosts: state.allPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch1: () => {
            // dispatch(actionCreator)
            axios.get('https://blog-api-u.herokuapp.com/v1/posts')
            .then(function(response){
                console.log(response);
                dispatch({type: "DATA_LOADED", 
                data: response.data});
            })
            .catch(function(error){
                console.log(error);
            })
        },
        clear: () => {
            dispatch({type: "CLEAR_DATA"});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);