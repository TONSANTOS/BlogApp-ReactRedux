import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInput, setBlogData } from '../features/userSlice'

import axios from 'axios'

import '../styles/blogs.css'

export function Blogs() {
    const searchInput = useSelector(selectUserInput) // Obtendo entrada de pesquisa
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=f18192b2c02d693c8b525285fea2fc75` // Especificar o url do blog, basicamente o ponto final da url

    const dispatch = useDispatch()

    const [blogs, setBlogs] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => { // Será executado sempre que houver uma mudança na entrada de pesquisa
        axios.get(blog_url)
            .then((response) => {
                dispatch(setBlogData(response.data))
                setBlogs(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [searchInput, blog_url, dispatch])

    return (
        <div className="blog__page">
            <h1 className="blog__page__header">Blogs</h1>
            {loading ? <h1 className="loading">Loagind...</h1> : ""} {/* Se está carregando renderiza isso */}
            <div className="blogs">
                {blogs?.articles?.map(blog => (
                    <a className="blog" target="_blank" href={blog.url} rel="noreferrer">
                        <img src={blog.image} alt="" />
                        <div>
                            <h3 className="sourceName">
                                <span>{blog.source.name}</span>
                                <p>{blog.publishedAt}</p>
                            </h3>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                ))}

                {/* // Verificar se os blocos estão disponíveis no caso de haver atraso.
                Desejo verificar se os blogs ponto total de artigos é igual a zero */}
                {blogs?.totalArticles == 0 && (
                    <h1 className="no__blogs">
                        Nenhum blog disponível 😞. Reformule sua pesquisa!
                    </h1>
                )}
            </div>
        </div>
    )
}
