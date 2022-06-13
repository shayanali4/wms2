import { useEffect, useState } from "react";
import { supabaseClient } from "../lib/client";
import * as React from "react";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import TableWip from "../components/Table/WIP";
import SideBar from "../components/SideBar";
import { NextPage } from "next";
import TitleText from "../components/TitleText";
import Heading from "../components/Heading";
import { WIPObject } from "../interfaces/WIPObject";

const WIPPage: NextPage = () => {
  const [WIPOrders, setWIPOrders] = useState<WIPObject[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWIPOrders = async () => {
      let { data: ordersIP }: { data: WIPObject[] | null } = await supabaseClient
        .from("order")
        .select("*")
        .eq("tracker_status", 3);
      console.log(ordersIP);
      setWIPOrders(ordersIP);
      setLoading(false);
    };
    fetchWIPOrders().catch(console.error);
  }, []);

  return (
    <>
      <Layout title="Work In Progress| Work Management System | TuPack" />
      <main>
        <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
          <Heading text="WMS" />
          <NavBar />
          <main role="main" className="w-full lg:w-5/6 flex-grow pt-1 px-3">
            {/* main content */}
            <div className="bg-white shadow-md rounded my-6">
              <TitleText text="In Progress" />
              {WIPOrders && <TableWip orders={WIPOrders} />}
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

export default WIPPage;
