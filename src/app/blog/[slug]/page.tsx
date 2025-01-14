import { getPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

type BlogPostParams = {
  params: {
    slug: string;
  }
}

// This builds all the params for ALL blog posts when the website is deployed
export function generateStaticParams() {
  const posts = getPosts();

  // generateStaticParams expects you to output an array of objects, containing the slug
  const slugsArray = posts.map((post) => ({slug: post.slug}))
  
  return slugsArray;
}

export default function page({ params }: BlogPostParams) {
  const post = getPostBySlug(params.slug);

  if(!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Missing Post</h1>
        <p>This post does not exist</p>
      </div>
    </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{post?.title}</h1>
        <strong>{post?.category}</strong>
        <p>{post?.content}</p>
      </div>
    </main>
  );
}
