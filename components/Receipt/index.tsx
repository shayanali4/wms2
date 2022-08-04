import React, { useEffect, useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import Logo from '../../public/logoOrange.png';
import ClientInfo from './clientInfo';
import OrderSummary from './orderSummary';
import InitialClientDetails from './initialClientDetails';
import TaskSpecificDetails from './taskSpecificDetails';
import WarehouseNotes from './warehouseNotes';
import { findSpecificFieldsForOrder } from '../../data/services';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontSize: '12px',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: '30%',
  },
  titleCont: {
    width: '20%',
    textAlign: 'left',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'heavy',
    fontSize: 30,
    color: '#F69E30',
  },
  subTitle: {
    textAlign: 'center',
  },
});

type Props = {
  order: any;
  brand: Object;
  task: Object;
};

const Receipt: React.FunctionComponent<Props> = ({
  order,
  brand,
  task,
}) => {
  const [specifics, setSpecifics] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const specificFields = await findSpecificFieldsForOrder(
        order.id
      );
      if (specificFields) {
        setSpecifics(specificFields);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <Document>
      {specifics && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Image src={Logo.src} style={styles.image} />
            <View style={styles.titleCont}>
              <Text style={styles.title}>Tu Pack</Text>
              <Text style={styles.subTitle}>Work Management</Text>
              <Text style={styles.subTitle}>System</Text>
            </View>
            <ClientInfo order={order} brand={brand} />
            <OrderSummary order={order} task={task} />
            <WarehouseNotes order={order} />
            <InitialClientDetails
              order={order}
              task={task}
              specifics={specifics}
            />
            <TaskSpecificDetails specifics={specifics} />
          </View>
        </Page>
      )}
    </Document>
  );
};

export default Receipt;
