import { NextPage } from 'next';
import logoOrange from '../public/logoOrange.png';

const LoginPage: NextPage = () => {
  return (
    <>
      <body className="bg-amber-500 ">
        <div className="flex min-h-screen items-center justify-center">
          <div className=" bg-white border border-none p-3 rounded-2xl">
            <div className="sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
              <div className="w-2/5 h-1/5">
                <img src={logoOrange.src} alt="logo" />
                <h1 className="text-black text-center text-4xl">
                  Admin Access to WMS Tracker
                </h1>
              </div>

              <form
                className="orderAuth flex flex-col  space-y-5 py-10"
                //   onSubmit={handleSubmit}
              >
                <h1 className="text-black text-2xl">
                  Process Your Work Orders here
                </h1>

                <input
                  required
                  className="w-full p-2 bg-white rounded-md  border border-gray-700 focus:border-blue-700"
                  placeholder="Username"
                  type="text"
                />
                <input
                  required
                  className="w-full p-2 bg-white rounded-md  border border-gray-700 focus:border-blue-700"
                  placeholder="Password"
                  type="password"
                />
                <input
                  className="w-full p-2 bg-black hover:bg-amber-500 rounded-full font-bold text-white border-gray-700 cursor-pointer"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default LoginPage;
