import { useEffect, useState } from 'react';
import { supabaseClient } from '../lib/client';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import QueueTable from '../components/Table/Index';
import SideBar from '../components/SideBar';
import { NextPage } from 'next';
import TitleText from '../components/TitleText';
import Heading from '../components/Heading';

const IndexPage: NextPage = () => {
  const [newOrders, setNewOrders] = useState([{}]);
  const [tasks, setWorkTasks] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewOrders = async () => {
      const { data } = await supabaseClient.from('order').select('*');
      console.log(data);
      setNewOrders(data || [{}]);
    };
    const fetchWorkTasks = async () => {
      const { data } = await supabaseClient
        .from('work_tasks')
        .select('*');
      console.log(data);
      setWorkTasks(data || [{}]);
    };
    fetchNewOrders().catch(console.error);
    fetchWorkTasks().catch(console.error);
    setLoading(false);
    return () => {
      setNewOrders([{}]); // Clean up
      setWorkTasks([{}]); // Clean up
      setLoading(true); // Clean up
    };

  return (
    <>
      <Layout title="Queue | Work Management System | TuPack" />
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
              <TitleText text="Queue" />
              {loading ? (
                <p className="text-2xl">Loading ...</p>
              ) : null}
              <QueueTable orders={newOrders} tasks={tasks} />
            </div>
          </main>
          <div className="w-fixed w-full flex-shrink flex-grow-0 px-2">
            <SideBar />
          </div>
        </div>
      </main>
      <footer className="bg-yellow-300 mt-auto">
        <h1 className="">hi </h1>
      </footer>
    </>
  );
};

export default IndexPage;
