import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './favoritos.css';
import {toast} from 'react-toastify';

export default function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        
        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || []);  

    }, []);

    function handleDelete(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id) 
        }) 
        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
        toast.success('Filme exluído com sucesso!')
    }

    return(
        <div className="meus-Filmes">
            <h1>Meus Filmes Favoritos</h1>

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.nome}</span>
                            <div>
                                <Link className="detalhes" to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button className="excluir" onClick={ () => handleDelete(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {filmes.length === 0 && <strong className="mensagemError">Você ainda não tem nenhum filme favorito :(</strong>}
        </div>
    )
}