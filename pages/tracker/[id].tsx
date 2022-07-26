import { NextPage } from 'next';
import { Tracker } from '../../components/Tracker/Tracker';
import { supabaseClient } from '../../lib/client';

const Tracking: NextPage = (Props) => {
  return (
    <Tracker
      tracking_id={Props.tracking_id}
      created_at={Props.created_at}
      tracker_status={Props.tracker_status}
      decline_reason={Props.decline_reason}
      time_accepted={Props.time_accepted}
      expected_finish_date={Props.expected_finish_date}
      finish_time={Props.finish_time}
      time_taken={Props.time_taken}
      target_time={Props.target_time}
      initial_cost={Props.initial_cost}
    ></Tracker>
  );
};

export default Tracking;

export async function getServerSideProps(context: any) {
  const id = context.query.id;

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
      return {
        props: data,
      };
    }
  } catch (error: any) {
    alert(error.message);
  } finally {
  }
}
