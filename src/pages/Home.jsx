import React, { useState, useEffect } from 'react'
import Service from '../appwrite/config'
import { Container, PostCard } from '../store/Components'

function Home() {

    const [posts, setPosts] = useState(null)

    useEffect(() => {
        Service.getPosts().then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    }, [])


    if (posts) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    } else {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read Posts.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home