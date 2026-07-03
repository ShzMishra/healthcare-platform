const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.searchProviders = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.json([]);

    const providers = await prisma.provider.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            city: {
              contains: query,
              mode: "insensitive",
            },
          },
        ]
      },
      take: 10,
    });

    res.json(providers);
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({
      message: "Search failed",
      error: err.message,
    });
  }
};