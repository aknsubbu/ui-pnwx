import { title } from "@/components/primitives";

export default async function AboutPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <div>
      <h1 className={title()}>Products</h1>
      <p className="text-center text-lg">{id}</p>
    </div>
  );
}
