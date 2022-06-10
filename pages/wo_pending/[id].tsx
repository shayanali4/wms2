import { useState } from 'react';
import { AcceptWO } from '../../components/WorkOrderScreens/AcceptWO';
import { SpecificFields } from '../../components/WorkOrderScreens/SpecificFields';
import { NextPage } from 'next';
import { supabaseClient } from '../../lib/client';

const PendingWorkOrder: NextPage = (Props) => {
  const [workOrder, setWorkOrder] = useState(null);
  // const [specificFields, setSpecificFields] = useState({});

  let order = Props.order;
  let specificFields = Props.specificFields;
  return (
    <>
      <AcceptWO
        id={order.id}
        tracking_id={order.tracking_id}
        created_at={order.created_at}
        description={order.description}
        initial_units_or_quantity={order.initial_units_or_quantity}
        brand_entry={order.brand_entry}
        name={order.name}
        email={order.email}
        number={order.number}
        skus={order.skus}
      ></AcceptWO>
      <SpecificFields contents={specificFields.specificFields} />
    </>
  );
};

export default PendingWorkOrder;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  console.log(id);

  const orderFetch = async () => {
    try {
      let { data, error } = await supabaseClient
        .from('order')
        .select(`*`)
        .eq('id', id)
        .single();
      if (data) {
        return data;
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const specificFieldsFetch = async () => {
    try {
      let { data, error } = await supabaseClient
        .from('specific_fields')
        .select(`*`)
        .eq('order_id', id)
        .single();
      if (data) {
        return data;
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const [orderData, specificFieldsData] = await Promise.all([
    await orderFetch(),
    await specificFieldsFetch(),
  ]);
  console.log('order data');
  console.log(typeof orderData);
  console.log('spec fields data');
  console.log(typeof specificFieldsData);

  return {
    props: {
      order: orderData,
      specificFields: specificFieldsData,
    },
  };

  // try {
  //   let { data, error, status } = await supabaseClient
  //     .from('order')
  //     .select(`*`)
  //     .eq('id', id)
  //     .single();

  //   if (error && status !== 406) {
  //     throw error;
  //   }

  //   if (data) {
  //     // console.log(data);
  //     return {
  //       props: data,
  //     };
  //   }
  // } catch (error: any) {
  //   alert(error.message);
  // } finally {
  //   try {
  //     // https://stackoverflow.com/questions/64996432/how-to-query-using-join-in-supabase
  //     console.log('second call');
  //     let { data, error, status } = await supabaseClient
  //       .from('specific_fields')
  //       .select(`*`)
  //       .eq('order_id', id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       console.log('founddata');
  //       console.log(data);
  //       return {
  //         props: { specificFields: data },
  //       };
  //     }
  //   } catch (error: any) {
  //     alert(error.message);
  //   }
  // }
}
