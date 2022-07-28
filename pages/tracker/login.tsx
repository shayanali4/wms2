import { NextPage } from 'next';
import logoOrange from '../../public/logoOrange.png';

const TrackerPage: NextPage = () => {
  return (
    <>
      <body className="bg-amber-500 ">
        <div className="flex min-h-screen items-center justify-center">
          <div className=" bg-white border border-none p-3 rounded-2xl">
            <div className="sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
              <div className="w-2/5 h-1/5">
                <img src={logoOrange.src} alt="logo" />
                <h1 className="text-black text-center text-4xl">
                  WMS Tracker
                </h1>
              </div>

              <form
                className="orderAuth flex flex-col  space-y-5 py-10"
                //   onSubmit={handleSubmit}
              >
                <h1 className="text-black text-2xl">
                  Get the latest update on your Work Order
                </h1>

                <input
                  required
                  className="w-full p-2 bg-black rounded-md  border border-gray-700 focus:border-blue-700"
                  placeholder="Email Address"
                  type="email"
                />
                <input
                  required
                  className="w-full p-2 bg-gray-900 rounded-md  border border-gray-700 focus:border-blue-700"
                  placeholder="Order Number (e.g. TUP01234)"
                  type="text"
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

export default TrackerPage;
