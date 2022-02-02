import { GetServerSideProps } from "next";
import React from "react";
import PostDetail from "../../components/PostDetail";
import prisma from "../../lib/prisma";
import { PostProps } from "../../types/props";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = Number(params?.id);
  const matchedPost = await prisma.post.findFirst({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          email: true,
          id: true,
        },
      },
      likes: {
        select: {
          id: true,
          author: {
            select: {
              email: true,
              id: true,
            },
          },
        },
      },
      comments: {
        select: {
          text: true,
          id: true,
          author: {
            select: {
              email: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: {
      post: matchedPost,
    },
  };
};

function Detail({ post }: PostProps) {
  return <PostDetail id={post.id} pst={post} authorId={post.authorId} />;
}

export default Detail;
