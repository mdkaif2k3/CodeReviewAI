const prisma = require("../config/prisma");

async function getProfile(userId) {

    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

}

module.exports = { getProfile };