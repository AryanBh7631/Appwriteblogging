import React from 'react'
import { Container, PostForm } from '../store/Components'

function AddPost() {
    return (
        <div className='py-8'>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost