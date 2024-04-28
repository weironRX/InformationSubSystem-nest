import { Prisma } from "@prisma/client";

export const returnServiceObject: Prisma.ServiceSelect = {
    id: true,
    name: true,
    price: true
}
