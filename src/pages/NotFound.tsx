import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-indigo-600 mt-4">
        404 Página No Encontrada
      </h1>
      <p className="mt-10 text-center text-indigo-600">
        Tal vez quieras volver a{" "}
        <Link className=" text-purple-500 font-extrabold cursor-pointer" to={"/"}>
          Bingo
        </Link>
      </p>
    </>
  );
}
