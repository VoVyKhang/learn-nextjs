import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface IPostDetailPageProps {
  post: any
}

export default function PostDetailPage({ post }: IPostDetailPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <div style={{ fontSize: 25 }}>Loading...</div>
  }

  return (
    <div>
      <h2>Post Detail Page</h2>

      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsList = await fetch(
    'https://js-post-api.herokuapp.com/api/posts?_page=1'
  )
  const data = await postsList.json()

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<IPostDetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  const postId = context.params?.postId

  if (!postId) return { notFound: true }

  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  )
  const data = await response.json()

  return {
    props: {
      post: data,
    },
    revalidate: 5,
  }
}
