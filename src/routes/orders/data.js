export const data = {
  type: 'orders',
  data: [
    {
      id: '0102031',
      orderDate: 'Jan 23, 2020',
      status: 'pending',
      vehicle: '1XY001',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Seattle, WA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'BILL_OF_LADING',
            size: '213 KB',
            location: 'COOCAR',
            uploaded_at: 'Jan 12 2021 8:00am',
          },
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
          {
            filename: 'MEGA SUPER ULTRA DOCUMENT',
            size: '163645631 TB',
            location: 'Beginning of the Universe',
            uploaded_at: '∞',
          },
        ],
      },
      statusDetails: {
        dispatchedFrom: {
          name: 'Walmart',
          location: 'Seattle, WA 02476',
          day: 'Today',
          time: '8:25 AM',
          status: 'dispatched',
        },
        stopPoints: [
          {
            name: 'Walmarts Friend',
            location: 'Seattle, WA 02475',
            day: 'Today',
            time: '3:45 PM',
            status: 'complete',
          },
        ],
        destination: {
          name: 'Target',
          location: 'Seattle, WA 01652',
          day: 'June 25th',
          time: '9:45 AM',
          status: 'in progress',
        },
        timeline: {
          trailerNum: '01234',
          event: 'Final Drop Loaded Trailer',
          apptTime: 'Jan 25, 2021  • 9:45 AM',
          arrivalTime: 'Jan 25, 2021  • 9:45 AM',
          uploadedDocs: 'POD-01.pdf',
          deliveryNotes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tristique commodo eget semper id. Ultrices nunc posuere pellentesque ut etiam egestas sapien elit sed. Pellentesque ornare donec urna, integer. Facilisi ut pulvinar elit, tempus, aliquam tincidunt velit nunc.',
        },
        customerInfo: {
          customerName: 'Shipping Compony',
          customerID: '1756273',
          address: '1253 Shipping St, Kansas City, KS 66414',
          phoneNumber: '913-333-4444',
        },
        refNumbers: {
          customerOrderId: '0102031',
          stopRef: '2375923752:2835235',
          dictNum: '0000000000000',
          orderMarks:
            '*** EXPEDITED FREIGHT ***DO NOT BOBTAIL TO SHIPPER, MUST ARRIVE 1HR EARLY -- HOT FREIGHT MUST PICK UP AND DELIVER ON TIME! issues with this load contact expeditedcsr@rti1.com or call 913‑233‑5514',
        },
      },
    },
    {
      id: '0102032',
      orderDate: 'Jan 24, 2020',
      status: 'completed',
      vehicle: '1XY123',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Atlanta, GA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
        ],
      },
    },
    {
      id: '0102032',
      orderDate: 'Jan 24, 2020',
      status: 'declined',
      vehicle: '1XY123',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Atlanta, GA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
        ],
      },
    },
    {
      id: '0102032',
      orderDate: 'Jan 24, 2020',
      status: 'dispatched',
      vehicle: '1XY123',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Atlanta, GA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
        ],
      },
    },
    {
      id: '0102032',
      orderDate: 'Jan 24, 2020',
      status: 'in progress',
      vehicle: '1XY123',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Atlanta, GA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
        ],
      },
    },
  ],
};

export const headers = [
  { header: 'order', text: 'Order' },
  { header: 'status', text: 'Status' },
  { header: 'vehicle', text: 'Vehicle' },
  { header: 'startPoint', text: 'Start Point' },
  { header: 'endPoint', text: 'End Point' },
  { header: 'view', text: 'View' },
  { header: 'actions', text: 'Actions' },
];
