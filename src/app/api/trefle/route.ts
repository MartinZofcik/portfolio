import { TrefleResponse } from '@/app/api/trefle/trefle.dto';

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
  const data = (await res.json()) as TrefleResponse;

  return Response.json({ data });
}

// import { getErrorMessage } from '@/server/utils';
//
// export async function getTrefleDetails(plantName: string) {
//   const TREFLE_PLANTS_TOKEN = 'zDEHaWIRni5YNL6_kJQDS8FauKdbZjPd1ulaM0Dp2H0';
//   try {
//     const res = await fetch(
//       `https://trefle.io/api/v1/plants/search?token=${TREFLE_PLANTS_TOKEN}&q=${plantName}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': '*',
//         },
//       },
//     );
//     return {
//       status: 'success',
//       plants: res.json(),
//     };
//   } catch (err) {
//     return {
//       status: 'error',
//       message: getErrorMessage(err),
//     };
//   }
// }
