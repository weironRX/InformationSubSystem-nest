import { Prisma } from "@prisma/client";

export const returnClientObject: Prisma.ClientSelect = {
    id: true,
	alias: true,
    contact: true
}
