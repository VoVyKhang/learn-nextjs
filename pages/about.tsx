import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import Header from '../components/common/Header'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'

export interface IAppProps {}

const Header = dynamic(() => import('../components/common/Header'), {
  ssr: false,
})

export default function App(props: IAppProps) {
  const router = useRouter()
  const [postList, setPostList] = useState([])
  const page = router.query?.page

  useEffect(() => {
    if (!page)
      return // Trong lần render đầu tiên thì page là undifine (router.query là {})
    ;(async () => {
      const postsList = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
      )
      const data = await postsList.json()

      setPostList(data.data)
    })()
  }, [page])

  console.log('Query: ', router.query)

  const handleNextPage = () => {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
      // Shallow routing: trigger update ở phía client, không gọi phía server(getStaicProps nữa). Trong
      // trường hợp này chỉ thay đổi page ở phía client
    )
  }

  // React.useEffect(() => {
  //   // Check query available
  // })

  return (
    <div>
      <Header />
      <h2>About Page</h2>
      <ul>
        {postList.map((post: any) => {
          return (
            <li key={post.id}>
              {post.title} - {post.id}
            </li>
          )
        })}
      </ul>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  )
}

export async function getStaticProps() {
  console.log('Get Static Props')
  return {
    props: {},
  }
}
