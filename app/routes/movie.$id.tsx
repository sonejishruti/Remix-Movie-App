import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, Outlet } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzZlODdjMTQ2YTM0ZTNjOGJkMGVjY2JjYjk0ZTFjNyIsInN1YiI6IjY1YjM0NmUxYTBmMWEyMDE0NmJlMGE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YVAGxmDJJBtW0lUmOYH_u8vYXb8cgCjxEX6AgVr8ZCI",
      },
    }
  );
  return json(await response.json());
}

export default function MovieId() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt=""
        className="h-[40vh] object-cover w-full rounded-lg"
      />
      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>
      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h1>
            <span className="underline">Homepage:</span>{" "}
            <Link to={data.homepage} target="_black">
              Link
            </Link>
          </h1>
          <h1>
            <span className="underline">Orignal Language</span>{" "}
            {data.original_language}
          </h1>
          <p>
            <span className="underline">Overview:</span> {data.overview}
          </p>
          <p>
            <span className="underline">Release Date</span> {data.release_date}
          </p>
        </div>
        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
