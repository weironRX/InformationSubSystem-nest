import { Prisma } from "@prisma/client";

export const returnSessionObject: Prisma.SessionSelect = {
	id: true,
	hour: true,
	alias: true,
	contact: true,
    service: true,
    price: true,
}
