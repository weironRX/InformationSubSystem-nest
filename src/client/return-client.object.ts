import { Prisma } from "@prisma/client";

export const returnClientObject: Prisma.ClientSelect = {
	alias: true,
    contact: true
}
