import { useState } from 'react';
import { AcceptWO } from '../../components/WorkOrderScreens/AcceptWO';
import { NextPage } from 'next';
import { supabaseClient } from '../../lib/client';

const PendingWorkOrder: NextPage = (Props) => {
  const [workOrder, setWorkOrder] = useState(null);

  return (
    <AcceptWO
      id={Props.id}
      tracking_id={Props.tracking_id}
      created_at={Props.created_at}
      description={Props.description}
      initial_units_or_quantity={Props.initial_units_or_quantity}
      brand_entry={Props.brand_entry}
      name={Props.name}
      email={Props.email}
      number={Props.number}
      skus={Props.skus}
    ></AcceptWO>
  );
};

export default PendingWorkOrder;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  console.log(id);
  try {
    let { data, error, status } = await supabaseClient
      .from('order')
      .select(`*`)
      .eq('id', id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      console.log(data);
      return {
        props: data,
      };
    }
  } catch (error: any) {
    alert(error.message);
  }
}
