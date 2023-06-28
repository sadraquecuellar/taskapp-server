import { FastifyInstance } from "fastify"
import {z} from 'zod'
import { prisma } from "./lib/prisma"

export default async function appRoutes(app:FastifyInstance){
  app.get('/', async () => {
    return {
      ping: 'pong',
      status: '200',
      statusText: 'OK'
    }
  })

  app.get('/tasks', async () => {
    const tasks = await prisma.task.findMany({})

    return {data:tasks}
  })

  app.post('/task', async (req) => {

    const createdTaskBody = z.object({
      title: z.string(),
      description: z.string(),
      color: z.string(),
      done: z.boolean(),
    })

    const { title, description, color, done } = createdTaskBody.parse(req.body)

    const tasks = await prisma.task.create({
      data: {
        title: title,
        description: description,
        color: color,
        done: done,
        created_at: new Date()
      }
    })

    return tasks
  })

  app.put('/task/:id', async (req) => {

    const updatedIdTaskBody = z.object({
      id: z.string().uuid(),
    })
    const updatedTaskBody = z.object({
      title: z.string(),
      description: z.string(),
      color: z.string(),
    })

    const { id } = updatedIdTaskBody.parse(req.params)
    const { title, description, color } = updatedTaskBody.parse(req.body)

    const taskUpdated = await prisma.task.update({
      where: {
        id: id
      },
      data: {
        title: title,
        description: description,
        color: color,
      }
    })

    return taskUpdated
  })
}