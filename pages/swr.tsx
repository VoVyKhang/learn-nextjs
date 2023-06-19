import React, { useState } from 'react'
import { StudentDetail } from '../components/swr'

export default function SWRPage() {
  const [detailList, setDetailList] = useState([1, 1, 1, 1])

  const handleAddList = () => {
    setDetailList((preList) => [...preList, 1])
  }

  return (
    <div>
      <button onClick={handleAddList}>Add Detail</button>

      <ul>
        {detailList.map((detail: any, index: any) => (
          <li key={index}>
            <StudentDetail studentId="lea11ziflg8xoiza" />
          </li>
        ))}
      </ul>
    </div>
  )
}
