export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const plant_name = searchParams.get('plant_name');

  const res = await fetch(
    `https://trefle.io/api/v1/plants/search?token=${process.env.TREFLE_PLANTS_TOKEN}&q=${plant_name}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
  const data = await res.json();

  return Response.json({ data } as any);
}
