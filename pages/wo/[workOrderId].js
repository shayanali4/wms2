import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import WorkOrder from '../../components/WorkOrder';

Modal.setAppElement('#__next');

const WorkOrderPage = ({ workOrderId }) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        isOpen={true} // The modal should always be shown on page load, it is the 'page'
        onRequestClose={() => router.push('/')}
        contentLabel="Post modal"
      >
        <WorkOrder id={workOrderId} pathname={router.pathname} />
      </Modal>
    </>
  );
};

export default WorkOrderPage;

export function getStaticProps({ params: { workOrderId } }) {
  return { props: { workOrderId: workOrderId } };
}

export function getStaticPaths() {
  return {
    paths: [3, 4].map((workOrderId) => ({
      params: { workOrderId: workOrderId.toString() },
    })),
    fallback: false,
  };
}
