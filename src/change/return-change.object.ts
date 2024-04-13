import { Prisma } from "@prisma/client";

export const returnChangeObject: Prisma.ChangeSelect = {
    date: true,
    length: true
}
