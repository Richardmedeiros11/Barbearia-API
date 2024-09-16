import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const newClient = async (nome, email, telefone, data, hora) => {
    const user = await prisma.client.create({
        data: {
            nome: nome,
            email: email,
            telefone: telefone,
            data: data,
            hora: hora
        }
    })
    console.log(user)
    return user
}
export const getUsers = async () => {
    const users = await prisma.client.findMany();
    return users
}
export const deleteUsers = async (id) => {
    console.log(id)
    let user = await prisma.client.delete({
        where: { "id": id }
    })
    return user
}