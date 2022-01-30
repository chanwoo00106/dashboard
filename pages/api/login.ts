import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ error: "You should fill the form " });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { email: user.email, id: user.id, time: new Date() },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "6h",
      }
    );
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 6 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res.json({ email: user.email });
  } else {
    res.status(403).json({ error: "Incorrect email or password" });
    return;
  }
}
