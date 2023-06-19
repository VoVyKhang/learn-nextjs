import * as React from 'react'
import useSWR from 'swr'

export interface IStudentDetailProps {
  studentId: string
}

const MS_PER_HOUR = 60 * 60 * 1000

export function StudentDetail({ studentId }: IStudentDetailProps) {
  const { data, mutate, isValidating, error } = useSWR(
    `students/${studentId}`,
    {
      revalidateOnFocus: false,
      dedupingInterval: MS_PER_HOUR,
    }
  )

  return (
    <div>
      Name: {data?.name || '--'}
      <button onClick={() => mutate({ name: 'Hoshi' }, true)}>Mutate</button>
    </div>
  )
}
