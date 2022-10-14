import {useEffect, useState} from 'react'
import "./filme-info.css"
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify';

export default function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    
    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get(`r-api/?api=filmes/${id}`);
            // console.log(response.data)
            setFilme(response.data);
            setLoading(false);
            if (response.data.length === 0) {
                history.replace('/');
            }
        }   
        loadFilmes();
    }, [history, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if (hasFilme) {
            toast.info('Você já tem esse filme salvo!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme Salvo com sucesso!')
    }

    if (loading) {
        return (
        <div className="filme-info">
            <h1>Carregando seu filme...</h1>
        </div>
        )
    }
    return (
        <div  className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome}/>

            <h2>Sinopse</h2>
            <p>{filme.sinopse}</p>

            <div className="botoes">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer dublado`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}