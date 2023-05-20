import { prisma } from "@/lib/db"
import { TASK_STATUS } from "@prisma/client"

function getStatus() {
    const status = [
        TASK_STATUS.STARTED,
        TASK_STATUS.NOT_STARTED,
        TASK_STATUS.COMPELTED,
    ]
    return status[Math.floor(Math.random() * status.length)]
}

function hashPassword(pass: string) {
    return pass
}

async function main() {
    const user = await prisma.user.upsert({
        where: { email: "john@doe.co" },
        update: {},
        create: {
            email: "john@doe.co",
            password: hashPassword("1234"),
            firstname: "john",
            lastname: "doe",
            projects: {
                create: new Array(5).fill(1).map((_, i) => {
                    return {
                        name: `Project ${i}`,
                        due: new Date(2023, 12, 25),
                    }
                }),
            },
        },
        include: {
            projects: true,
        },
    })

    const task = await Promise.all(
        user.projects.map((project) => {
            return prisma.task.createMany({
                data: new Array(10).fill(1).map((_, i) => {
                    return {
                        name: `task ${i}`,
                        description: `description of task ${i}`,
                        ownerId: user.id,
                        projectId: project.id,
                        status: getStatus(),
                    }
                }),
            })
        })
    )

    console.log("DATABASE SUCCEFULLY SEEDED")
    console.log({ user, task })
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (err) => {
        console.log(err)
        await prisma.$disconnect()
        process.exit(1)
    })
