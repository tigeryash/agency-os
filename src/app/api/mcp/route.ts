import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { createMcpServer } from '@/lib/mcp/server'
import { NextRequest } from 'next/server'

function verifyAuth(request: NextRequest): boolean {
  const token = process.env.MCP_AUTH_TOKEN
  if (!token) return true // No token configured = open in dev

  const header = request.headers.get('authorization')
  return header === `Bearer ${token}`
}

async function handleMcpRequest(request: NextRequest): Promise<Response> {
  if (!verifyAuth(request)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const server = createMcpServer()
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })

  await server.connect(transport)

  const response = await transport.handleRequest(request)

  return response
}

export async function POST(request: NextRequest) {
  return handleMcpRequest(request)
}

export async function GET(request: NextRequest) {
  return handleMcpRequest(request)
}

export async function DELETE(request: NextRequest) {
  return handleMcpRequest(request)
}
