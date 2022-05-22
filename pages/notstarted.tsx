import * as React from 'react';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { NextPage } from 'next';
import TitleText from '../components/TitleText';
import Heading from '../components/Heading';
import NotStartedTable from '../components/Table/NotStarted';

const IndexPage: NextPage = () => {
  return (
    <>
      <Layout title="Not Started | Work Management System | TuPack" />
      <main>
        <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
          <Heading text="WMS" />
          <NavBar />
          <main
            role="main"
            className="w-full lg:w-5/6 flex-grow pt-1 px-3"
          >
            {/* main content */}
            <div className="bg-white shadow-md rounded my-6">
              <TitleText text="Not Started" />
              <NotStartedTable />
            </div>
          </main>
          <div className="w-fixed w-full flex-shrink flex-grow-0 px-2">
            <SideBar />
          </div>
        </div>
      </main>
    </>
  );
};

export default IndexPage;