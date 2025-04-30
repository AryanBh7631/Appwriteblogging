import React, { useState, useEffect } from 'react'
import { Container, PostForm } from '../store/Components'
import Service from '../appwrite/config'
import { useParams, useNavigate } from "react-router-dom"

function EditPost() {

    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            Service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            console.log(slug)
            console.log("Can't Make")
            navigate('/')
        }
    }, [slug, navigate])


    if (post) {
        return <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    } else {
        return null
    }

}

export default EditPost