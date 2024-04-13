import { Prisma } from "@prisma/client";

export const returnServiceObject: Prisma.ServiceSelect = {
    name: true,
    price: true
}
