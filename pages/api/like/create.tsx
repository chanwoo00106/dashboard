import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.cookies;
  const { id, authorId } = req.body;

  let likeAuthorId;

  try {
    if (token) {
      const { email }: any = jwt.verify(token, process.env.JWT_SECRET || "");
      const me: any = await prisma.user.findUnique({ where: { email } });

      const allLikes = await prisma.like.findMany({
        where: {
          postId: id,
        },
      });

      allLikes.map((lk) => (likeAuthorId = lk.authorId));

      if (me.id === authorId)
        return res
          .status(400)
          .json({ error: "You cannot like a post you created" });

      if (likeAuthorId === me.id) {
        return res
          .status(400)
          .json({ error: "You cannot like a post you created" });
      }

      const like = await prisma.like.create({
        data: { author: { connect: { email } }, post: { connect: { id } } },
      });
      res.status(200).json({ success: "Liked with success", like });
    } else {
      res.json({ error: "You must be logged in to like" });
      return;
    }
  } catch (e) {}
}
