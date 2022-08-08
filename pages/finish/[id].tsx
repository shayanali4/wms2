import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { FinishSummary } from '../../components/WorkOrderScreens/Finish/FinishSummary';
import { finishOrder } from '../../data/services';
import S3UploadFile from '../../components/s3UploadFile';
import Button from '../../components/Button/';
import { WorkOrder } from '../../interfaces/WorkOrder';
import { TimeSummary } from '../../components/WorkOrderScreens/Finish/TimeSummary';
import { FinishWO } from '../../components/WorkOrderScreens/Finish/FinishWO';
import { PricingSummary } from '../../components/WorkOrderScreens/Finish/PricingSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { updateZendeskTicket } from '../../data/services/zendesk';

interface File {
  name: string;
}

const FinishIndex: NextPage = (props: any) => {
  const [workOrder, setWorkOrder] = useState<WorkOrder>({
    email: '',
  });
  const [specifics, setSpecifics] = useState({});
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    finishOrder(props.id).then((data: any) => {
      console.log(data);
      if (data.order) {
        setWorkOrder(data.order);
      }
      if (data.specificFields) {
        setSpecifics(data.specificFields);
      }
      if (data.workTasks) {
        setTasks(data.workTasks);
      }
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData: WorkOrder = { tracker_status: 3 };
    let QCPics: any = [];
    const emailAd = workOrder ? workOrder.email : '';

    Array.prototype.forEach.call(
      e.target.elements,
      (element: any) => {
        console.log(element.id, ' ', element.value);
        element.id == 'declineReason'
          ? (formData = {
              ...formData,
              tracker_status: 99,
              decline_reason: element.value,
            })
          : null;
        element.id == 'timeTaken'
          ? (formData = { ...formData, start_time: element.value })
          : null;
        element.id == 'finishTime'
          ? (formData = { ...formData, finish_time: element.value })
          : null;
        element.id == 'finalPrice'
          ? (formData = {
              ...formData,
              expected_finish_date: element.value,
            })
          : null;
        element.id == 'finalUnits'
          ? (formData = {
              ...formData,
              expected_finish_date: element.value,
            })
          : null;
        element.id == 'finalComments' && element.value.length > 1
          ? (formData = {
              ...formData,
              expected_finish_date: element.value,
            })
          : null;
        if (element.id == 'QCPics') {
          if (element.files) {
            [...element.files].forEach((file: File) => {
              S3UploadFile(file, emailAd);
              QCPics.push(
                `https://wmspics.s3.amazonaws.com/${emailAd}/qc/${file.name}`
              );
            });
          }
        }
        QCPics.length > 0 ? (formData['qc_pics'] = QCPics) : null;


        if (element.id == "submitReject") {
          const ticketData = {
            ticket: {
              subject: "Close Ticket",
              status: "solved",
              comment: {
                body: `
                    ${workOrder.decline_reason? `Decline reason: ${workOrder.decline_reason} \n`:""}
                    ${workOrder.assigned_to_id? `Assigned To: ${workOrder.assigned_to_id} \n`:""}
                    ${workOrder.brand_entry? `Brand Entry: ${workOrder.brand_entry} \n`:""}
                    ${workOrder.brand_id? `Brand ID: ${workOrder.brand_id} \n`:""}
                    ${workOrder.created_at? `Created at: ${workOrder.created_at} \n`:""}
                    ${workOrder.description? `Description: ${workOrder.description} \n`:""}
                    ${workOrder.email? `Email: ${workOrder.email} \n`:""}
                    ${workOrder.expected_finish_date? `Finish Date:  ${workOrder.expected_finish_date} \n`:""}
                    ${workOrder.final_comments? ` Final Comments: ${workOrder.final_comments} \n`:""}
                    ${workOrder.final_price? `Final Price: ${workOrder.final_price} \n`:""}
                    ${workOrder.final_units_or_quantity? `Final Units/Quantity: ${workOrder.final_units_or_quantity} \n`:""}
                    ${workOrder.finish_time? `Finish Time: ${workOrder.finish_time} \n`:""}
                    ${workOrder.id? ` Order Id: ${workOrder.id} \n`:""}
                    ${workOrder.initial_comments? `Comments: ${workOrder.initial_comments} \n`:""}
                    ${workOrder.initial_cost? ` Inital Cost: ${workOrder.initial_cost} \n`:""}
                    ${workOrder.initial_units_or_quantity? ` Inital Units/Quantity: ${workOrder.initial_units_or_quantity} \n`:""}
                    ${workOrder.minutes_taken? `Minutes Taken: ${workOrder.minutes_taken} \n`:""}
                    ${workOrder.name? ` Order Name: ${workOrder.name} \n`:""}
                    ${workOrder.number? ` Order Number: ${workOrder.number} \n`:""}
                    ${workOrder.receipt_pdf_url? ` PDF URL: ${workOrder.receipt_pdf_url} \n`:""}
                    ${workOrder.start_time? `  Start Time: ${workOrder.start_time} \n`:""}
                    ${workOrder.target_time? `  Target Time: ${workOrder.target_time} \n`:""}
                    ${workOrder.time_accepted? `  Time Accepted: ${workOrder.time_accepted} \n`:""}
                    ${workOrder.tracker_status? ` Tracker Status: ${workOrder.tracker_status} \n`:""}
                    ${workOrder.work_task_id? ` Work Task ID: ${workOrder.work_task_id} \n`:""}
                   
                    \n Order Specifics: \n
  
                    ${specifics.approxWeight? `Approx Weight: ${specifics.approxWeight} \n`:""}
                    ${specifics.barcodeRequired? ` Barcode Requied: ${specifics.barcodeRequired} \n`:""}
                    ${specifics.collectionAddress? `Collection Address: ${specifics.collectionAddress} \n`:""}
                    ${specifics.courierId? `CourierID: ${specifics.courierId} \n`:""}
                    ${specifics.dateRequired? `Date Required: ${specifics.dateRequired} \n`:""}
                    ${specifics.deliveryAddress? `Delivery Address: ${specifics.deliveryAddress} \n`:""}
                    ${specifics.deliveryType? `Delivery Type: ${specifics.deliveryType} \n`:""}
                    ${specifics.dimensions? `Dimensions: ${specifics.dimensions} \n`:""}
                    ${specifics.finalSKU? `Final SKU: ${specifics.finalSKU} \n`:""}
                    ${specifics.flatOrHanging? `Flat or Hanging: ${specifics.flatOrHanging} \n`:""}
                    ${specifics.garmentSpecifics? `Garment Specifics: ${specifics.garmentSpecifics} \n`:""}
                    ${specifics.handOrPC? `Hand or PC: ${specifics.handOrPC} \n`:""}
                    ${specifics.itemNeedMeasuring? `Item Need Measuring: ${specifics.itemNeedMeasuring} \n`:""}
                    ${specifics.message? `Message: ${specifics.message} \n`:""}
                    ${specifics.orderNumber? `Order Number: ${specifics.orderNumber} \n`:""}
                    ${specifics.packagingInstructions? `Packaging Instructions: ${specifics.packagingInstructions} \n`:""}
                    ${specifics.packingRequirements? `Packaging Requirements: ${specifics.packingRequirements} \n`:""}
                    ${specifics.parcelDimensions? `Parcel Dimensions: ${specifics.parcelDimensions} \n`:""}
                    ${specifics.quantityOfItems? `Quantity: ${specifics.quantityOfItems} \n`:""}
                    ${specifics.reasonForCount? `Reason for count: ${specifics.reasonForCount} \n`:""}
                    ${specifics.decline_reason? `Roll need mesasuring: ${specifics.rollNeedMeasuring} \n`:""}
                    ${specifics.rollSize? `Roll Size: ${specifics.rollSize} \n`:""}
                    ${specifics.skus? `SKUS: ${specifics.skus} \n`:""}
                    ${specifics.threadColour? `Thread Color: ${specifics.threadColour} \n`:""}
                    ${specifics.typeOfInsert? `Type of interest: ${specifics.typeOfInsert} \n`:""}
                    ${specifics.weight? ` Weight: ${specifics.weight} \n`:""}
                       `,
              },
            },
          };
          const response = await updateZendeskTicket(
            workOrder.zendesk_id,
            ticketData
          );
        } else {
          const ticketData = {
            ticket: {
              subject: "Update Ticket",
              status: "pending",
              comment: {
                body: `
                ${workOrder.decline_reason? `Decline reason: ${workOrder.decline_reason} \n`:""}
                ${workOrder.assigned_to_id? `Assigned To: ${workOrder.assigned_to_id} \n`:""}
                ${workOrder.brand_entry? `Brand Entry: ${workOrder.brand_entry} \n`:""}
                ${workOrder.brand_id? `Brand ID: ${workOrder.brand_id} \n`:""}
                ${workOrder.created_at? `Created at: ${workOrder.created_at} \n`:""}
                ${workOrder.description? `Description: ${workOrder.description} \n`:""}
                ${workOrder.email? `Email: ${workOrder.email} \n`:""}
                ${workOrder.expected_finish_date? `Finish Date:  ${workOrder.expected_finish_date} \n`:""}
                ${workOrder.final_comments? ` Final Comments: ${workOrder.final_comments} \n`:""}
                ${workOrder.final_price? `Final Price: ${workOrder.final_price} \n`:""}
                ${workOrder.final_units_or_quantity? `Final Units/Quantity: ${workOrder.final_units_or_quantity} \n`:""}
                ${workOrder.finish_time? `Finish Time: ${workOrder.finish_time} \n`:""}
                ${workOrder.id? ` Order Id: ${workOrder.id} \n`:""}
                ${workOrder.initial_comments? `Comments: ${workOrder.initial_comments} \n`:""}
                ${workOrder.initial_cost? ` Inital Cost: ${workOrder.initial_cost} \n`:""}
                ${workOrder.initial_units_or_quantity? ` Inital Units/Quantity: ${workOrder.initial_units_or_quantity} \n`:""}
                ${workOrder.minutes_taken? `Minutes Taken: ${workOrder.minutes_taken} \n`:""}
                ${workOrder.name? ` Order Name: ${workOrder.name} \n`:""}
                ${workOrder.number? ` Order Number: ${workOrder.number} \n`:""}
                ${workOrder.receipt_pdf_url? ` PDF URL: ${workOrder.receipt_pdf_url} \n`:""}
                ${workOrder.start_time? `  Start Time: ${workOrder.start_time} \n`:""}
                ${workOrder.target_time? `  Target Time: ${workOrder.target_time} \n`:""}
                ${workOrder.time_accepted? `  Time Accepted: ${workOrder.time_accepted} \n`:""}
                ${workOrder.tracker_status? ` Tracker Status: ${workOrder.tracker_status} \n`:""}
                ${workOrder.work_task_id? ` Work Task ID: ${workOrder.work_task_id} \n`:""}
               
                \n Order Specifics: \n
  
                ${specifics.approxWeight? `Approx Weight: ${specifics.approxWeight} \n`:""}
                ${specifics.barcodeRequired? ` Barcode Requied: ${specifics.barcodeRequired} \n`:""}
                ${specifics.collectionAddress? `Collection Address: ${specifics.collectionAddress} \n`:""}
                ${specifics.courierId? `CourierID: ${specifics.courierId} \n`:""}
                ${specifics.dateRequired? `Date Required: ${specifics.dateRequired} \n`:""}
                ${specifics.deliveryAddress? `Delivery Address: ${specifics.deliveryAddress} \n`:""}
                ${specifics.deliveryType? `Delivery Type: ${specifics.deliveryType} \n`:""}
                ${specifics.dimensions? `Dimensions: ${specifics.dimensions} \n`:""}
                ${specifics.finalSKU? `Final SKU: ${specifics.finalSKU} \n`:""}
                ${specifics.flatOrHanging? `Flat or Hanging: ${specifics.flatOrHanging} \n`:""}
                ${specifics.garmentSpecifics? `Garment Specifics: ${specifics.garmentSpecifics} \n`:""}
                ${specifics.handOrPC? `Hand or PC: ${specifics.handOrPC} \n`:""}
                ${specifics.itemNeedMeasuring? `Item Need Measuring: ${specifics.itemNeedMeasuring} \n`:""}
                ${specifics.message? `Message: ${specifics.message} \n`:""}
                ${specifics.orderNumber? `Order Number: ${specifics.orderNumber} \n`:""}
                ${specifics.packagingInstructions? `Packaging Instructions: ${specifics.packagingInstructions} \n`:""}
                ${specifics.packingRequirements? `Packaging Requirements: ${specifics.packingRequirements} \n`:""}
                ${specifics.parcelDimensions? `Parcel Dimensions: ${specifics.parcelDimensions} \n`:""}
                ${specifics.quantityOfItems? `Quantity: ${specifics.quantityOfItems} \n`:""}
                ${specifics.reasonForCount? `Reason for count: ${specifics.reasonForCount} \n`:""}
                ${specifics.decline_reason? `Roll need mesasuring: ${specifics.rollNeedMeasuring} \n`:""}
                ${specifics.rollSize? `Roll Size: ${specifics.rollSize} \n`:""}
                ${specifics.skus? `SKUS: ${specifics.skus} \n`:""}
                ${specifics.threadColour? `Thread Color: ${specifics.threadColour} \n`:""}
                ${specifics.typeOfInsert? `Type of interest: ${specifics.typeOfInsert} \n`:""}
                ${specifics.weight? ` Weight: ${specifics.weight} \n`:""}
                   `,
              },
            },
          };
          const response = await updateZendeskTicket(
            workOrder.zendesk_id,
            ticketData
          );
        }

      }
    );
  };

  return (
    <>
      {workOrder && specifics && tasks && (
        <>
          {console.log(workOrder, specifics, tasks)}
          <Layout title={`Complete WO`} />
          <Button text="Go Back" hyperlink="/wip" />
          <FinishSummary workOrder={workOrder} tasks={tasks} />
          <form onSubmit={handleSubmit}>
            <TimeSummary workOrder={workOrder} />
            <PricingSummary workOrder={workOrder} />
            <SpecificDetails
              specifics={specifics}
              workOrder={workOrder}
            />
            <FinishWO />
          </form>
        </>
      )}
    </>
  );
};

export default FinishIndex;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  return {
    props: {
      id,
    },
  };
}
