import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export interface IParamsCacheStaleFiveProps {
  query: any
  post: any
}

export default function ParamsCacheStaleFive({
  post,
}: IParamsCacheStaleFiveProps) {
  const router = useRouter()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((x) => {
        if (x > 60) clearInterval(intervalId)
        return x + 1
      })
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <h1>Params Page</h1>

      <p>Time: {seconds}</p>

      <h2>Post detail</h2>
      <p>{post?.title}</p>
      <p>{post?.author}</p>
      <p>{post?.description}</p>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=5')
  // Request đầu tiên sẽ vẫn gọi hàm và trả về data, trong request 5s tiếp theo, nó vẫn sẽ
  // trả về data ngay lập tức, và request 5s tiếp theo swr (6s, 7s,...) nó vẫn trả về data cũ
  // và âm thầm trigger data mới thông qua hàm vì nó chỉ cần 5s như mình khai báo
  // và từ request thứ 3 nó sẽ gọi lại hàm và phải đợi trả về data mới

  await new Promise((res) => setTimeout(res, 3000))

  const postId = context.query.postId
  if (!postId) return { props: { query: context.query } }

  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  )
  const data = await response.json()

  return {
    props: {
      query: context.query,
      post: data,
    },
  }
}
