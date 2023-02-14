import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const today = new Date()

async function run() {
  await prisma.task.deleteMany()

  /**
   * Create tasks
   */
  await Promise.all([
    prisma.task.create({
      data: {
        title: 'Lembrete',
        description: 'Não esqueça de comprar leite no caminho de volta para casa.',
        color: 'pink-500',
        done: false,
        created_at: today
      }
    }),
    prisma.task.create({
      data: {
        title: 'Lembrete',
        description: 'Marcar reunião com equipe às 10h amanhã.',
        color: 'green-500',
        done: false,
        created_at: today
      }
    }),
    prisma.task.create({
      data: {
        title: 'Lembrete',
        description: 'Entregar relatório final para o chefe até sexta-feira.',
        color: 'blue-500',
        done: false,
        created_at: today
      }
    }),
    prisma.task.create({
      data: {
        title: 'Lembrete',
        description: 'Ir ao dentista na próxima terça-feira às 14h.',
        color: 'yellow-500',
        done: false,
        created_at: today
      }
    }),
    prisma.task.create({
      data: {
        title: 'Lembrete',
        description: 'Comprar presente para o aniversário da amiga no fim de semana.',
        color: 'red-500',
        done: false,
        created_at: today
      }
    }),

  ])

}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })