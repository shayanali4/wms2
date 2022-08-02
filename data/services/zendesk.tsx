export const updateZendeskStatus = async (ticketID: number) => {
  const subdomain = process.env.NEXT_PUBLIC_ZENDESK_SUBDOMAIN;

  const data = {
    ticket: {
      body: 'testing update',
    },
  };

  console.log(
    `Authorization: Basic ${process.env.NEXT_PUBLIC_ZENDESK_EMAIL}/token:${process.env.NEXT_PUBLIC_ZENDESK_API_TOKEN}`
  );

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.NEXT_PUBLIC_ZENDESK_EMAIL}/token:${process.env.NEXT_PUBLIC_ZENDESK_API_TOKEN}`,
    };
    const response = await fetch(
      `http://${subdomain}.zendesk.com/api/v2/tickets/${ticketID}.json/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers,
      }
    );
    await response.json();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// $.ajax({
//     url: '/api/v2/users.json',
//     contentType:'application/json',
//     type: 'POST',
//     data: JSON.stringify({user:{name: name, email:email}})
//   });
