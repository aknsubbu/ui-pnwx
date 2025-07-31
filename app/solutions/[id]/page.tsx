import { title } from "@/components/primitives";

export default function BlogPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <h1 className={title()}>Blog</h1>
      <p className="text-center text-lg">
        This is the about page for product {id}. Here you can learn more about
        our offerings and how we can help you.
      </p>
    </div>
  );
}
