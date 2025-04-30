import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import Service from '../appwrite/config'
import { Button, Container } from '../store/Components'
import parse from "html-react-parser"
import { useSelector } from "react-redux"

function Post() {

    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate();


    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // console.log(userData.$id, "ty", post, slug)


    useEffect(() => {
        if (slug) {
            Service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate("/")
                }
            })
        }
    }, [slug, navigate])

    const deletePost = () => {
        console.log(post.featuredImage)
        Service.deletePost(post.$id).then((status) => {
            if (status) {
                Service.deleteFile(post.featuredImage);
                navigate("/")
            }
        })
    }

    // console.log(post, slug)
    return post ? (
        <div className="py-8">
            <Container>
                <div className=' h-16 border-4 border-red-800 w-fit'>
                    <img src={Service.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl bg-cover ring-offset-black' />
                </div>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${slug}`}>
                                <Button bgColor="bg-green-500" className="mr-3" children="Edit" />
                            </Link>
                            <Button bgColor='bg-red-600' onClick={deletePost} children="Delete" />
                        </div>
                    )}
                </div>
                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                </div>
                <div className='browser-css'>{parse(post.content)}</div>
            </Container>
        </div>
    ) : null
}
export default Post