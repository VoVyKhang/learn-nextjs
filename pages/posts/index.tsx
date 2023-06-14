import { GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'

export interface IGetListPostProps {
  posts: any[]
}

export default function GetListPost({ posts }: IGetListPostProps) {
  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>
        })}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<IGetListPostProps> = async (
  context: GetStaticPropsContext
) => {
  const postsList = await fetch(
    'https://js-post-api.herokuapp.com/api/posts?_page=1'
  )
  const data = await postsList.json()

  return {
    props: {
      posts: data.data.map((rs: any) => ({
        id: rs.id,
        title: rs.title,
      })),
    },
  }
}
