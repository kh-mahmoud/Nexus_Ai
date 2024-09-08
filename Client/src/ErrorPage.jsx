import { Link } from "react-router-dom";




const ErrorPage = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
         <img height={500} width={500} src="/error.png" alt="error" />
         <h1 className="text-2xl font-bold">Page not found</h1>
         <Link to={"/"} className="p-2 px-4 border-2 mt-3 rounded-[30px] border-white">
            Back to home
         </Link>

    </div>
  );
}

export default ErrorPage;
