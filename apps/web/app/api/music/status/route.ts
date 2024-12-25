// apps/web/app/api/music/status/route.ts
import { NextResponse } from 'next/server'

const API_TOKEN = 'sk-b37bf1237a3b45788c9569ebccc03a88'
const USER_ID = '413564'
const BASE_URL = 'https://dzwlai.com/apiuser/_open/suno'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const taskBatchId = searchParams.get('taskBatchId')

    if (!taskBatchId) {
      return NextResponse.json({ error: 'TaskBatchId is required' }, { status: 400 })
    }

    const response = await fetch(`${BASE_URL}/music/getState?taskBatchId=${taskBatchId}`, {
      headers: {
        'x-token': API_TOKEN!,
        'x-userId': USER_ID!
      }
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 })
  }
}
