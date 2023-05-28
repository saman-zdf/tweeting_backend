import { PrismaClient } from "@prisma/client";
let prisma;
if (process.env.Node_ENV === "production") {
    prisma = new PrismaClient();
}
else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}
export default prisma;
//# sourceMappingURL=db.js.map